import addonAPI, { types } from '@storybook/addons'
import React from 'react'
import registerCodePanel from './sourceCodeUtils/codeRegister'
import registerPresentationPanel from './presentationPanel/presentationRegister'
import registerTreePanel from './tree/treeRegister'
import { initBrain } from '../.refac/initBrain'
import sourceData from './sourceCodeUtils/_sourceCodes.json'
import { navigate } from '@storybook/router'

export const brain = initBrain(sourceData)

const versionNames = {
  // TODO - read & set dynamically
  v01: 'start',
  v02: 'immer',
  v03: 'test',
  v04: 'factory',
  v05: 'thunk',
  v06: 'guard',
  v07: 'deps',
  v08: 'cons',
  v09: 'sender',
  v10: 'reducer',
  v11: 'cons-ii'
}

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()
  // This emission was set up in the sourceDecorator
  channel.on('sourceCode/selectedStory', storyPath => {
    const newVersion = storyPath.match(/^src\/([^\/]*)\//)[1]
    if (brain.getState().code.version !== newVersion) {
      brain.clickLink(newVersion)
    } else {
      if (!brain.getState().code.file) {
        brain.clickLink(storyPath)
      }
    }
  })
  brain.subscribe(sourceData => {
    const storyVersion = storybookAPI
      .getUrlState()
      .storyId.match(/sclpg--(.{3})/)[1] // TODO - dynamic
    const brainVersion = sourceData.code.version
    if (storyVersion !== brainVersion) {
      setTimeout(() => {
        storybookAPI.selectStory(
          // TODO - dynamic
          `sclpg--${brainVersion}-${versionNames[brainVersion]}`
        )
      })
    }
  })
  function goToPanel(panel) {
    const currentPath = storybookAPI.getUrlState().path
    const newPath = currentPath.replace(/^\/[^\/]*\//, '/' + panel + '/')
    navigate(newPath)
  }
  registerPresentationPanel({ brain, sourceData, goToPanel })
  registerCodePanel({ brain, sourceData, goToPanel })
  registerTreePanel({ brain, sourceData, goToPanel })
})
