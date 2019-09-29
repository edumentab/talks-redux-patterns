import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import {
  AppState,
  selectCurrentThemeSets,
  loadSetsForThemeThunk
} from '../redux'
import { useSelector, useDispatch } from 'react-redux'

import { Set } from './Set'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId, sets } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      sets: selectCurrentThemeSets(state)
    })
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentThemeId && (!sets || (!sets!.data && !sets!.loading))) {
      dispatch(loadSetsForThemeThunk(currentThemeId))
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
