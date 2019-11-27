import addonAPI, { types } from '@storybook/addons'
import React from 'react'
import registerCodePanel from './sourceCodeUtils/codeRegister'
import registerPresentationPanel from './presentationPanel/presentationRegister'
import registerTreePanel from './tree/treeRegister'
import registerReduxPanel from './redux/reduxRegister'
import sourceData from './sourceCodeUtils/_sourceCodes.json'
import { navigate } from '@storybook/router'
import getClientBrain from './getClientBrain'

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const brain = getClientBrain('central registry')
  const channel = addonAPI.getChannel()
  // This emission was set up in the sourceDecorator
  channel.on('sourceCode/selectedVersion', newVersion => {
    if (brain.getState().code.version !== newVersion) {
      brain.clickLink(newVersion)
    } else {
      if (!brain.getState().code.file) {
        brain.clickLink(newVersion + '/app/App')
      }
    }
  })
  brain.subscribe(brainState => {
    const currentVersion = storybookAPI
      .getUrlState()
      .storyId.match(/sclpg--(.{3})/)[1] // TODO - dynamic
    const newVersion = brainState.code.version
    if (currentVersion !== newVersion) {
      window._refacVersion = newVersion // for use in store facade
      const newVersionName = sourceData.versionInfo[newVersion].name
        .toLowerCase()
        .replace(/ /g, '-')
      setTimeout(() => {
        storybookAPI.selectStory(
          // TODO - dynamic
          `sclpg--${newVersion}-${newVersionName}`
        )
      })
    }
    channel.emit('sourceCode/redux', brainState.redux)
  })
  function goToPanel(panel) {
    const currentPath = storybookAPI.getUrlState().path
    const newPath = currentPath.replace(/^\/[^\/]*\//, '/' + panel + '/')
    navigate(newPath)
  }
  registerPresentationPanel({ brain, sourceData, goToPanel, channel })
  registerCodePanel({ brain, sourceData, goToPanel, channel })
  registerTreePanel({ brain, sourceData, goToPanel, channel })
  registerReduxPanel({ brain, sourceData, goToPanel, channel })
})
