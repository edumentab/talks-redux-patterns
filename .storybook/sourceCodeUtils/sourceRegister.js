import addonAPI, { types } from '@storybook/addons'
import Panel from './sourcePanel'
import React from 'react'

import fileInfo from './_sourceCodes.json'

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()
  addonAPI.add('edumentab/sourcecode/panel', {
    type: types.TAB,
    title: 'source',
    route: ({ storyId }) => `/sourceCode/${storyId}`,
    match: ({ viewMode }) => viewMode === 'sourceCode',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return React.createElement(Panel, {
        channel: addonAPI.getChannel(),
        fileInfo,
        storybookAPI,
        active
      })
    }
  })
})
