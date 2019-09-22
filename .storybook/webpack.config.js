const SourcePlugin = require('./sourceCodeUtils/webpackPlugin')
const path = require('path')

module.exports = ({ config }) => {
  // remove Storybooks default CSS rules and replace with functioning CSS modules setup
  console.log(JSON.stringify(config.module.rules[0], null, 2))
  config.module.rules.splice(2, 1, {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: { sourceMap: true }
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      }
    ]
  })
  // add loader that registers raw source code in a cache
  config.module.rules.push({
    test: /\.m?[tj]sx?$|\.css$/,
    use: [
      {
        loader: path.resolve(__dirname, 'sourceCodeUtils/webpackLoader.js'),
        options: { root: path.resolve(__dirname, '../src') }
      }
    ]
  })

  // add loader that registers compiled source code in a cache
  config.module.rules.unshift({
    test: /\.m?[tj]sx?$|\.css$/,
    use: [
      {
        loader: path.resolve(__dirname, 'sourceCodeUtils/webpackLoader.js'),
        options: {
          root: path.resolve(__dirname, '../src'),
          compiled: true
        }
      }
    ]
  })
  // add plugin that collects the source code
  config.plugins.push(new SourcePlugin())
  // prevent filename mangling (which b0rks source file switching)
  config.mode = 'development'
  // prevent minification
  config.optimization.minimizer = []

  // config.plugins.forEach(p => {
  //   console.log('\n\n\n', p)
  // })
  config.resolve.extensions.push('.ts', '.tsx')

  // replace babel-loader added by storybook
  config.module.rules.splice(0, 1, {
    test: /\.([tj]s|[tj]sx)$/,
    loader: require.resolve('babel-loader')
  })

  return config
}
