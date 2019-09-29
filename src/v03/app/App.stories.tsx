import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v03 - storetest', () => {
  return <App key="v03" version="v03-store" />
})
