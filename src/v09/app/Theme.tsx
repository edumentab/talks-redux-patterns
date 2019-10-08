import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import { AppState, selectCurrentThemeSets, loadSetsInit } from '../redux'
import { useSelector } from 'react-redux'

import { Set } from './Set'
import { useDispatchWithSender } from './useDispatchWithSender'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId, sets } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      sets: selectCurrentThemeSets(state)
    })
  )

  const dispatch = useDispatchWithSender('Theme')

  useEffect(() => {
    if (currentThemeId && (!sets || (!sets!.data && !sets!.loading))) {
      dispatch(loadSetsInit(currentThemeId))
    }
  }, [currentThemeId, sets, dispatch])

  if (!currentThemeId) {
    return null
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <SetSelector />
      {currentSetId && <Set key={currentSetId} />}
    </div>
  )
}
