import addonAPI, { types } from '@storybook/addons'
import Tree from '../../.refac/components/sourceTree'
import React from 'react'

export default function registerPresentation({
  brain,
  storybookAPI,
  sourceData
}) {
  const channel = addonAPI.getChannel()

  addonAPI.add('edumentab/tree/panel', {
    type: types.TAB,
    title: 'files',
    route: ({ storyId }) => `/tree/${storyId}`,
    match: ({ viewMode }) => viewMode === 'tree',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return !active
        ? null
        : React.createElement(Tree, {
            channel: addonAPI.getChannel(),
            sourceData,
            storybookAPI,
            active,
            brain
          })
    }
  })
}
