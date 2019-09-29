import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('v03', module).add('Store test', () => {
  return <App key="v02" version="v03-store" />
})
