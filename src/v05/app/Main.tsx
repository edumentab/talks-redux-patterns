/* REFAC|EDITCOMMENT
We extracted the side effect logic from this component into <span data-file-link="../redux/slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span>. This means we can similarly simplify <span data-file-link="./Main.test"><code>Main.test</code></span>, since the responsibility for testing the side effect logic now resides in <span data-file-link="../redux/slices/rebrickable/thunks/loadThemesThunk.test"><code>loadThemesThunk.test</code></span>. That is advantageous since the latter is just a function unconcerned with the UI, thus easier to test.

The same thing happened in <span data-file-link="./Theme"><code>Theme</code></span> and <span data-file-link="../redux/slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { loadThemesThunk } from '../redux'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadThemesThunk())
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
