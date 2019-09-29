import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v07 - dependencies', () => {
  return <App key="v07" version="v07-deps" />
})
