import { storiesOf } from '@storybook/react'
import React from 'react'

import { Comp } from './comp'

storiesOf('examples/ChessPiece (transition, CSS modules)', module).add(
  'wahey!',
  () => {
    return <Comp />
  }
)
