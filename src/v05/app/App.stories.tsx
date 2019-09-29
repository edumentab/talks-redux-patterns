import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v05 - thunk', () => {
  return <App key="v05" version="v05-thunk" />
})
