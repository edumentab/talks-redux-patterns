import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import {
  AppState,
  loadSetsInit,
  loadSetsSuccess,
  loadSetsError
} from '../redux'
import { useSelector, useDispatch } from 'react-redux'

import { rebrickableService } from '../services'

import { Set } from './Set'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId, setsState } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      setsState: state.rebrickable.setsByTheme[state.ui.currentThemeId!] || {}
    })
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentThemeId && !setsState.data && !setsState.loading) {
      dispatch(loadSetsInit(currentThemeId))
      rebrickableService
        .getSetsForTheme(currentThemeId)
        .then(res => dispatch(loadSetsSuccess(currentThemeId, res)))
        .catch(err => dispatch(loadSetsError(currentThemeId, err)))
    }
  }, [currentThemeId, setsState, dispatch])

  if (!currentThemeId) {
    return null
  }

  return (
    <div>
      <SetSelector />
      {currentSetId && <Set key={currentSetId} />}
    </div>
  )
}
