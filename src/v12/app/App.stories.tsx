import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('SCLPG', module).add('v12 - conduxion', () => {
  return <App key="v12" version="v12-conduxion" />
})
