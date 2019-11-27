import React from 'react'
import { addons, types } from '@storybook/addons'
import { ReduxActions } from './reduxActions'
import { ReduxState } from './reduxState'

const MyPanel = () => {
  return Date.now()
}
export default function reduxRegister({
  brain,
  sourceData,
  goToPanel,
  channel
}) {
  addons.add('edumentab/redux/panel/state', {
    type: types.PANEL,
    title: 'State',
    render({ active, key }) {
      return active
        ? React.createElement(ReduxState, { key, brain, channel })
        : null
    }
  })
  addons.add('edumentab/redux/panel/actions', {
    type: types.PANEL,
    title: 'Actions',
    render({ active, key }) {
      return active
        ? React.createElement(ReduxActions, { key, brain, channel })
        : null
    }
  })
}
