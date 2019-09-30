import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v10 - reducer', () => {
  return <App key="v10" version="v10-reducer" />
})
