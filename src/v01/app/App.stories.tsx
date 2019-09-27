import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('v01', module).add('The beginning', () => {
  return <App key="v01" version="v01-start" />
})
