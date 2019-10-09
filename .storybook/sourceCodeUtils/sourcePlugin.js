const readSource = require('./readSource')
const fs = require('fs')
const path = require('path')

class SourcePlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('Source Code Plugin', () => {
      const sources = readSource()
      fs.writeFileSync(
        path.join(__dirname, '_sourceCodes.json'),
        JSON.stringify(sources, null, 2)
      )
    })
  }
}

module.exports = SourcePlugin
