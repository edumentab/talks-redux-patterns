const fs = require('fs')
const fm = require('front-matter')
const path = require('path')
const { execSync, exec } = require('child_process')
const { diffWords } = require('diff')
const { matchPathToFile } = require('./matchPathToFile')

const findRefacComment = /^\/* REFAC|EDITCOMMENT[\n\r]([\s\S]*?)\*\/[\s]*(?:test.todo\([^)]*\);?)?([\s\S]*)$/

function readSource(root) {
  const res = {}
  const presentation = {}
  const versionInfo = {}
  const versions = fs.readdirSync(root)

  versions.forEach(version => {
    const dirs = [path.join(root, version)]
    while (dirs.length) {
      const dir = dirs.shift()
      for (const p of fs.readdirSync(dir)) {
        const here = path.join(dir, p)
        if (fs.statSync(here).isDirectory()) {
          dirs.push(here)
        } else {
          const minusRoot = here.replace(path.join(root, version) + '/', '')
          let file = fs.readFileSync(here).toString()
          if (minusRoot === '_presentation.md') {
            const { body, attributes } = fm(file)
            versionInfo[version] = attributes
            presentation[version] = body
            continue
          }
          res[minusRoot] = res[minusRoot] || {
            versions: {},
            name: minusRoot,
            raw: []
          }
          const commMatch = file.match(findRefacComment)
          if (commMatch) {
            file = commMatch[2]
          }
          file = file.replace(/^\W*/g, '')
          if (file) {
            const idx = res[minusRoot].raw.indexOf(file)
            if (idx === -1) {
              res[minusRoot].raw.push(file)
              res[minusRoot].versions[version] = {
                which: res[minusRoot].raw.length - 1
              }
            } else {
              res[minusRoot].versions[version] = {
                which: idx
              }
            }
          } else {
            res[minusRoot].versions[version] = {
              which: null
            }
          }
          if (commMatch) {
            res[minusRoot].versions[version].editComment = commMatch[1]
          }
        }
      }
    }
  })

  for (const file in res) {
    const f = res[file]
    const potentialTest =
      file.match(/\.tsx?$/) && file.replace(/\.ts(x?)$/, '.test.ts$1')
    if (res[potentialTest]) {
      f.testedIn = potentialTest
    }
    f.allStates = []
    versions.forEach((v, n) => {
      const fileV = f.versions[v] || (f.versions[v] = { which: null })
      const prevV = versions[n - 1]
      const prevFileV = (prevV && f.versions[prevV]) || { which: null }
      fileV.state =
        fileV.which == null
          ? prevFileV.which != null
            ? 'deleted'
            : 'nonexistent'
          : n === 0
          ? 'initial'
          : prevFileV.which == null
          ? 'created'
          : prevFileV.which == fileV.which
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
    // if file unchanged after creation, set all states to 'eternal'
    if (f.allStates.slice(1).filter(s => s !== 'unchanged').length === 0) {
      f.allStates = versions.map(() => 'eternal')
      versions.forEach(v => {
        f.versions[v].state = 'eternal'
      })
    }
  }
  // add tree structure
  let tree = []
  for (const file in res) {
    const steps = file.split('/')
    let parent = { childNodes: tree }
    let id = ''
    for (const [i, step] of Object.entries(steps)) {
      id += (id ? '/' : '') + step
      let me = parent.childNodes.find(entry => entry.id === id)
      if (!me) {
        me = {
          label: step,
          id
        }
        parent.childNodes.push(me)
      }
      if (i < steps.length - 1) {
        me.childNodes = me.childNodes || []
        parent = me
      }
    }
  }
  function harmoniseTree(tree) {
    tree.sort((n1, n2) => {
      const n1Count = (n1.childNodes && n1.childNodes.length) || 0
      const n2Count = (n2.childNodes && n2.childNodes.length) || 0
      return n1.childNodes && !n2.childNodes
        ? -1
        : n2.childNodes && !n1.childNodes
        ? 1
        : n1.label < n2.label
        ? -1
        : 1
    })
    for (const n of tree) {
      if (n.childNodes) {
        harmoniseTree(n.childNodes)
      }
    }
    return tree
  }
  const sourceData = {
    files: res,
    versions,
    root,
    presentation,
    versionInfo,
    tree: harmoniseTree(tree)
  }
  // final sweep to check for errors
  for (const file in res) {
    const f = res[file]
    versions.forEach((v, n) => {
      const fileV = f.versions[v] || (f.versions[v] = { which: null })
      if (fileV.editComment) {
        const matches = (
          fileV.editComment.match(/data-file-link="[^"]*/g) || []
        ).map(l => l.replace('data-file-link="', ''))
        for (const path of matches) {
          if (!matchPathToFile({ sourceData, path, version: v, file })) {
            console.error(
              `Faulty comment link in version ${v} of ${file}: ${path}`
            )
          }
        }
      }
    })
  }
  return sourceData
}

module.exports = readSource
