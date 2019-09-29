import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v01 - start', () => {
  return <App key="v01" version="v01-start" />
})
