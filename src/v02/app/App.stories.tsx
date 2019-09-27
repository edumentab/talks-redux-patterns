import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('v02', module).add('Immer', () => {
  return <App key="v02" version="v02-immer" />
})
