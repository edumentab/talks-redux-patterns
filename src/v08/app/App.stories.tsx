import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v08 - cons', () => {
  return <App key="v08" version="v08-cons" />
})
