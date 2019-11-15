import addonAPI, { types } from '@storybook/addons'
import { Panel } from './presentationPanel'
import React from 'react'

export default function registerPresentation({
  brain,
  storybookAPI,
  sourceData
}) {
  const channel = addonAPI.getChannel()
  addonAPI.add('edumentab/presentation/panel', {
    type: types.TAB,
    title: 'Presentation',
    route: ({ storyId }) => `/presentation/${storyId}`,
    match: ({ viewMode }) => viewMode === 'presentation',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      return React.createElement(Panel, {
        channel: addonAPI.getChannel(),
        storybookAPI,
        brain,
        sourceData,
        active
      })
    }
  })
}
