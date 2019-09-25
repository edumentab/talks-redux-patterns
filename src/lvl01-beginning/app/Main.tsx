import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../redux'
import { rebrickableService } from '../services'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

export const Main: FunctionComponent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadThemesInit())
    rebrickableService
      .getThemesByParent(186)
      .then(res => dispatch(loadThemesSuccess(res)))
      .catch(err => dispatch(loadThemesError(err)))
  }, [dispatch])

  return (
    <div>
      <ThemeSelector />
      <Theme />
    </div>
  )
}
