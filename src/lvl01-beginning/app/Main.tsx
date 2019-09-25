import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  loadThemesInit,
  loadThemesError,
  loadThemesSuccess,
  AppState
} from '../redux'
import { rebrickableService } from '../services'

export const Main: FunctionComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadThemesInit())
    rebrickableService
      .getAllThemes()
      .then(res => dispatch(loadThemesSuccess(res)))
      .catch(err => dispatch(loadThemesError(err)))
  }, [dispatch])
  const { hasLoadedThemes, isLoadingThemes } = useSelector(
    (state: AppState) => ({
      hasLoadedThemes: state.rebrickable.themes !== null,
      isLoadingThemes: state.rebrickable.themes.loading
    })
  )
  return (
    <span>
      {isLoadingThemes
        ? '...loading...'
        : hasLoadedThemes
        ? 'We have data!'
        : 'No data :/'}
    </span>
  )
}
