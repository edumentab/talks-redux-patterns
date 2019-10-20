const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')
const { diffWords } = require('diff')

const root = path.join(__dirname, '../../src')

function readSource() {
  const res = {}

  const versions = fs.readdirSync(root)

  versions.forEach(version => {
    const dirs = [path.join(root, version)]
    while (dirs.length) {
      const dir = dirs.shift()
      fs.readdirSync(dir).forEach(p => {
        const here = path.join(dir, p)
        if (fs.statSync(here).isDirectory()) {
          dirs.push(here)
        } else {
          const minusRoot = here.replace(path.join(root, version) + '/', '')
          res[minusRoot] = res[minusRoot] || {
            versions: {},
            name: minusRoot,
            raw: []
          }
          const file = fs.readFileSync(here).toString()
          if (!res[minusRoot].raw.includes(file)) {
            res[minusRoot].raw.push(file)
          }
          res[minusRoot].versions[version] = {
            which: res[minusRoot].raw.indexOf(file)
          }
        }
      })
    }
  })

  for (const file in res) {
    const f = res[file]
    f.allStates = []
    versions.forEach((v, n) => {
      const fileV = f.versions[v] || (f.versions[v] = { which: null })
      const prevV = versions[n - 1]
      const prevFileV = (prevV && f.versions[prevV]) || { which: null }
      fileV.state =
        fileV.which === null
          ? prevFileV.which !== null
            ? 'deleted'
            : 'nonexistent'
          : prevFileV.which === null
          ? 'created'
          : prevFileV.which === fileV.which
          ? 'unchanged'
          : 'edited'
      if (fileV.state === 'edited') {
        const diff = diffWords(f.raw[prevFileV.which], f.raw[fileV.which])
        const processedDiff = []
        // merge a "removed" followed by "added" into a single "replaced"
        while (diff.length) {
          if (diff[0].removed && diff[1] && diff[1].added) {
            processedDiff.push({ replaced: true })
            diff.shift()
            diff.shift()
          } else {
            processedDiff.push(diff.shift())
          }
        }
        const { added, removed, replaced } = processedDiff.reduce(
          (mem, d) => ({
            added: mem.added || d.added,
            removed: mem.removed || d.removed,
            replaced: mem.replaced || d.replaced
          }),
          { added: false, removed: false, replaced: false }
        )
        if (removed && !added && !replaced) {
          fileV.state = 'pruned'
        }
        if (!removed && added && !replaced) {
          fileV.state = 'grown'
        }
        if (!removed && !added && replaced) {
          fileV.state = 'replaced'
        }
      }
      f.allStates.push(fileV.state)
      if (
        ['edited', 'deleted', 'pruned', 'grown', 'replaced'].includes(
          fileV.state
        )
      ) {
        fileV.previous = prevFileV.which
      }
    })
    if (f.allStates.slice(1).filter(s => s !== 'unchanged').length === 0) {
      f.allStates = versions.map(() => 'eternal')
      versions.forEach(v => {
        f.versions[v].state = 'eternal'
      })
    }
  }
  return {
    files: res,
    versions
  }
}

module.exports = readSource
