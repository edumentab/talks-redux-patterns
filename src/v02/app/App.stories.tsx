import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v02 - immer', () => {
  return <App key="v02" version="v02-immer" />
})
