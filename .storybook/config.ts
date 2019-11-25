import { configure, addDecorator, storiesOf } from '@storybook/react'
import sourceData from './sourceCodeUtils/_sourceCodes.json'
import sourceCodeDecorator from './sourceCodeUtils/sourceDecorator'
import { storeFacade } from '../.refac/storeFacade'
import getClientBrain from './getClientBrain'

function loadStories() {
  const brain = getClientBrain()
  storeFacade(brain)
  //addDecorator(withKnobs)
  //addDecorator(jsxDecorator)
  addDecorator(sourceCodeDecorator)
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
