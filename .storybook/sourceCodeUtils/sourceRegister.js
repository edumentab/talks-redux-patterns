import addonAPI, { types } from '@storybook/addons'
import Panel from './sourcePanel'
import React from 'react'

import { brain } from './sourceBrain'
import sourceData from './_sourceCodes.json'

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()
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
