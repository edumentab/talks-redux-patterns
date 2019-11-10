/* REFAC|EDITCOMMENT
There are no <span data-file-link="../redux/lib/types/thunk"><code>Thunks</code></span> anymore, so instead of dispatching a <span data-file-link="../redux/slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span> we dispatch a <span data-file-link="../redux/slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> action. The side effects that used to live in the thunk are now a <span data-file-link="../redux/slices/rebrickable/actions/loadThemesInit.consequence">consequence</span> of that action instead. This also means that the <span data-file-link="./Main.test">tests</span> for this component were simplified.

A very similar change happened in the <span data-file-link="./Theme">Theme</span> component.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadThemesInit } from '../redux'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadThemesInit())
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
