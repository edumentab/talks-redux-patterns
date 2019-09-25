import { storiesOf } from '@storybook/react'
import React from 'react'

import { App } from './App'

storiesOf('lvl01/app', module).add(
  'omg!',
  () => {
    return <App />
  },
  {
    notes: `so awesome! :D`
  }
)
