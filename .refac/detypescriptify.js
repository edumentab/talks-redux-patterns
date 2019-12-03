const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

module.exports = function detypescriptify({ code, filename }) {
  const js = babel.transformSync(code, {
    filename,
    sourceType: 'module',
    babelrc: false,
    plugins: [
      [
        '@babel/plugin-transform-typescript',
        {
          isTSX: filename.match(/\.tsx$/)
        }
      ]
    ],
    retainLines: true
  }).code

  const pretty = prettier.format(js, {
    filepath: filename,
    singleQuote: true,
    semi: false
  })
  return pretty
}
