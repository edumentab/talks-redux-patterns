/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> now contains a `.sender` property, so we switch to using the new <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate `.sender` correctly (this also means having to do a slight tweak to our <span data-file-link="./Main.test">tests</span>).

The same change was made in <span data-file-link="./Guess"><code>Guess</code></span>, <span data-file-link="./Theme"><code>Theme</code></span>, <span data-file-link="./SetSelector"><code>SetSelector</code></span> and <span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span>.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { useDispatchWithSender } from './useDispatchWithSender'
import { loadThemesInit } from '../redux'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
  const dispatch = useDispatchWithSender('Main')
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
