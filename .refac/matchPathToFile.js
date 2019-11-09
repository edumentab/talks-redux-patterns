const _path = require('path')

function matchPathToFile({ sourceData, path = '', file = '', version = '' }) {
  const [, folder] = sourceData.root.match(/\/([^/]*)$/)
  let fixed = (path[0] === '.'
    ? _path.join(file.replace(/\/[^/]*$/, '/'), path)
    : path
  )
    .replace(new RegExp(`^${folder}`), '')
    .replace(/^\.?\//, '')
    .replace(/\/$/, '')

  let newVersion = sourceData.versions.find(
    v => fixed.substr(0, v.length) === v
  )
  if (newVersion) {
    fixed = fixed.replace(newVersion + '/', '')
    if (fixed === newVersion) {
      fixed = file
    }
  } else {
    newVersion = version
  }

  for (const suffix of suffixes) {
    if (sourceData.files[fixed + suffix]) {
      return {
        file: fixed + suffix,
        version: newVersion
      }
    }
  }
}

const suffixes = [
  '/index.jsx',
  '/index.js',
  '/index.ts',
  '/index.tsx',
  '.jsx',
  '.js',
  '.tsx',
  '.ts',
  '.css',
  ''
]

module.exports = { matchPathToFile }
