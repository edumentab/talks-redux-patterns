import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentSet } from '../redux'

import { Guess } from './Guess'

export const Set: FunctionComponent = () => {
  const set = useSelector(selectCurrentSet)!
  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <div className="setPic" style={{ flexGrow: 1, position: 'relative' }}>
        <img src={set.set_img_url} style={{ maxWidth: '100%' }} />
      </div>
      <div
        style={{
          width: '150px',
          paddingLeft: '10px',
          flexGrow: 0,
          flexShrink: 0
        }}
      >
        <Guess />
      </div>
    </div>
  )
}
