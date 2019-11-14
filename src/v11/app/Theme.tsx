/* REFAC|EDITCOMMENT
The code for loading sets for a theme has been moved from here into a <span data-file-link="../redux/slices/ui/actions/setCurrentTheme">consequence of <code>setCurrentTheme</code></span>.

Our <span data-file-link="./Theme.test">tests</span> for this components have therefore been simplified as the responsibility of testing the logic has moved to <span data-file-link="../redux/slices/ui/actions/setCurrentTheme.test"><code>setCurrentTheme.test</code></span>.
*/

import React, { FunctionComponent } from 'react'

import { SetSelector } from './SetSelector'
import { AppState, selectCurrentThemeSets } from '../redux'
import { useSelector } from 'react-redux'

import { Set } from './Set'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId } = useSelector((state: AppState) => ({
    ...state.ui,
    sets: selectCurrentThemeSets(state)
  }))

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
