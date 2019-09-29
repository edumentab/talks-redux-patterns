import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v09 - sender', () => {
  return <App key="v09" version="v09-sender" />
})
