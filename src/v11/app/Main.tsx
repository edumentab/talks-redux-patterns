/* REFAC|EDITCOMMENT
The responsibility of firing the <span data-file-link="../redux/slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> action has been moved from here into <span data-file-link="../redux/makeStore"><code>makeProdStore</code></span>.

Our <span data-file-link="./Main.test">tests</span> for this components have thereby been simplified.
*/

import React, { FunctionComponent } from 'react'

import { ThemeSelector } from './ThemeSelector'
import { Theme } from './Theme'

type MainProps = {
  version: string
}

export const Main: FunctionComponent<MainProps> = ({ version }) => {
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
