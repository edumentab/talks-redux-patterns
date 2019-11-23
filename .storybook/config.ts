import { configure, addDecorator, storiesOf } from '@storybook/react'
import sourceData from './sourceCodeUtils/_sourceCodes.json'
import sourceCodeDecorator from './sourceCodeUtils/sourceDecorator'

function loadStories() {
  console.log('LOADING STORIES', sourceData)
  //const req = require.context('../src', true, /\.stories\.[tj]sx$/)
  //addDecorator(withKnobs)
  //addDecorator(jsxDecorator)
  addDecorator(sourceCodeDecorator)
  //req.keys().forEach(filename => req(filename))
  for (const version of sourceData.versions) {
    const name = sourceData.versionInfo[version].name
    storiesOf('sclpg', module).add(`${version} - ${name}`, () => {
      const React = require('react')
      const App = require(`../src/${version}/app/App`).default
      return React.createElement(App, {
        key: version,
        version: `${version}-${name}`
      })
    })
  }
}

configure(loadStories, module)
