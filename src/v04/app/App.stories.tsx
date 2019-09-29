import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('v04', module).add('Factory', () => {
  return <App key="v04" version="v04-factory" />
})
