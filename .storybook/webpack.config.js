const SourcePlugin = require('./sourceCodeUtils/webpackPlugin')
const path = require('path')

module.exports = ({ config }) => {
  // remove Storybooks default CSS rules and replace with functioning CSS modules setup
  config.module.rules.splice(
    2,
    1,
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true }
        }
      ]
    },
    {
      test: /\.css$/,
      exclude: /@blueprint/,
      use: [
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
    },
    {
      test: /@blueprint.*\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: false
          }
        }
      ]
    }
  )

  // add plugin that collects the source code
  config.plugins.push(new SourcePlugin())
  // prevent filename mangling (which b0rks source file switching)
  config.mode = 'development'
  // prevent minification
  config.optimization.minimizer = []

  config.resolve.extensions.push('.ts', '.tsx', '.css')

  // replace babel-loader added by storybook which doesn't handle TS
  config.module.rules.splice(
    0,
    1,

    // add loader that registers compiled source code in a cache
    {
      test: /\.m?[tj]sx?$|\.css$/,
      use: [
        {
          loader: path.resolve(__dirname, 'sourceCodeUtils/webpackLoader.js'),
          options: { root: path.resolve(__dirname, '../src'), compiled: true }
        }
      ]
    },

    // add our own babel-loader
    {
      test: /\.([tj]s|[tj]sx)$/,
      loader: require.resolve('babel-loader')
    },

    // add loader that registers raw source code in a cache
    {
      test: /\.m?[tj]sx?$|\.css$/,
      use: [
        {
          loader: path.resolve(__dirname, 'sourceCodeUtils/webpackLoader.js'),
          options: { root: path.resolve(__dirname, '../src') }
        }
      ]
    }
  )

  return config
}
