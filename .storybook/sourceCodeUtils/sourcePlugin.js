const getSource = require('./executeReadSourceFunc')

class SourcePlugin {
  apply(compiler) {
    compiler.hooks.run.tap('Source Code Plugin', () => {
      console.log('Rewriting source (run)!')
      getSource()
    })
    compiler.hooks.watchRun.tap('Source Code Plugin', () => {
      console.log('Rewriting source (watchRun)!')
      getSource()
    })
  }
}

module.exports = SourcePlugin
