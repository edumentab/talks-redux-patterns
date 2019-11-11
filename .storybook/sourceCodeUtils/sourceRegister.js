import addonAPI, { types } from '@storybook/addons'
import Panel from '../../.refac/components/sourcePanel'
import React from 'react'

import { initBrain } from '../../.refac/initBrain'
import sourceData from './_sourceCodes.json'

export const brain = initBrain(sourceData)

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()
  // This emission was set up in the sourceDecorator
  channel.on('sourceCode/selectedStory', brain.clickLink)
  addonAPI.add('edumentab/sourcecode/panel', {
    type: types.TAB,
    title: 'source',
    route: ({ storyId }) => `/sourceCode/${storyId}`,
    match: ({ viewMode }) => viewMode === 'sourceCode',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return React.createElement(Panel, {
        channel: addonAPI.getChannel(),
        sourceData,
        storybookAPI,
        active,
        brain
      })
    }
  })
})
