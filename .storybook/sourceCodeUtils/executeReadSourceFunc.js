const readSource = require('../../.refac/readSource')
const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, '../../src')

module.exports = function doIt() {
  const sources = readSource(root)

  fs.writeFileSync(
    path.join(__dirname, '_sourceCodes.json'),
    JSON.stringify(sources, null, 2)
  )
}
