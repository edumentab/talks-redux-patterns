import addonAPI, { types } from '@storybook/addons'
import Panel from '../../.refac/components/sourcePanel'
import React from 'react'

export default function registerCodePanel({ brain, sourceData, storybookAPI }) {
  addonAPI.add('edumentab/sourcecode/panel', {
    type: types.TAB,
    title: 'code',
    route: ({ storyId }) => `/sourceCode/${storyId}`,
    match: ({ viewMode }) => viewMode === 'sourceCode',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return active
        ? React.createElement(Panel, {
            channel: addonAPI.getChannel(),
            sourceData,
            storybookAPI,
            active,
            brain
          })
        : null
    }
  })
}
