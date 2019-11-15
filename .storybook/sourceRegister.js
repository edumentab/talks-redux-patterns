import addonAPI, { types } from '@storybook/addons'
import React from 'react'
import registerCodePanel from './sourceCodeUtils/codeRegister'
import registerPresentationPanel from './presentationPanel/presentationRegister'
import { initBrain } from '../.refac/initBrain'
import sourceData from './sourceCodeUtils/_sourceCodes.json'

export const brain = initBrain(sourceData)

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()
  // This emission was set up in the sourceDecorator
  channel.on('sourceCode/selectedStory', storyPath => {
    const newVersion = storyPath.match(/^src\/([^\/]*)\//)[1]
    brain.clickLink(brain.getState().code.file ? newVersion : storyPath)
  })
  registerCodePanel({ brain, sourceData, storybookAPI })
  registerPresentationPanel({ brain, sourceData, storybookAPI })
})
