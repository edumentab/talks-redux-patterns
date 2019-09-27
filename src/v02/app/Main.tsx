import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../redux'
import { rebrickableService } from '../services'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadThemesInit())
    rebrickableService
      .getThemesByParent(186)
      .then(res => dispatch(loadThemesSuccess(res)))
      .catch(err => dispatch(loadThemesError(err)))
  }, [dispatch])

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>Super Castle Lego piece guesser</span>
        <small style={{ fontWeight: 'normal', marginTop: '5px' }}>
          ({version})
        </small>
      </h3>
      <ThemeSelector />
      <Theme />
    </div>
  )
}
