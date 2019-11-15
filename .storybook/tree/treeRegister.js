import addonAPI, { types } from '@storybook/addons'
import Tree from '../../.refac/components/sourceTree'
import React from 'react'

import { initBrain } from '../../.refac/initBrain'
import sourceData from './_sourceCodes.json'

export const brain = initBrain(sourceData)

addonAPI.register('edumentab/sourcecode', storybookAPI => {
  const channel = addonAPI.getChannel()

  addonAPI.add('edumentab/sourcecode/tree', {
    type: types.TAB,
    title: 'tree',
    route: ({ storyId }) => `/tree/${storyId}`,
    match: ({ viewMode }) => viewMode === 'tree',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return React.createElement(Tree, {
        channel: addonAPI.getChannel(),
        sourceData,
        storybookAPI,
        active,
        brain
      })
    }
  })
})
