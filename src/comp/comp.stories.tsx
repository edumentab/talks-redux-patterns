import { storiesOf } from '@storybook/react'
import React from 'react'

import { Comp } from './comp'

storiesOf('testing comp', module).add('wahey!', () => {
  return <Comp />
})
