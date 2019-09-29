import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v04 - factory', () => {
  return <App key="v04" version="v04-factory" />
})
