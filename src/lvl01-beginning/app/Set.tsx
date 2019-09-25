import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentSet } from '../redux'

export const Set: FunctionComponent = () => {
  const set = useSelector(selectCurrentSet)!
  return (
    <div>
      <h4>
        {set.name} ({set.year})
      </h4>
      <img
        className="setPic"
        style={{ maxWidth: '100%' }}
        src={set.set_img_url}
      />
    </div>
  )
}
