import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../redux'

export const Set: FunctionComponent = () => {
  const set = useSelector((state: AppState) => {
    const { currentSetId, currentThemeId } = state.ui
    return state.rebrickable.setsByTheme[currentThemeId!].data![currentSetId!]
  })
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
