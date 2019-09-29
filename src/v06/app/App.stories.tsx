import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v06 - guard', () => {
  return <App key="v06" version="v05-guard" />
})
