/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> now contains a `.sender` property, so we switch to using the new <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate `.sender` correctly (this also means having to do a slight tweak to our <span data-file-link="./Theme.test">tests</span>).

The same change was made in <span data-file-link="./Guess"><code>Guess</code></span>, <span data-file-link="./Main"><code>Main</code></span>, <span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span> and <span data-file-link="./SetSelector"><code>SetSelector</code></span>.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import { AppState, selectCurrentThemeSets, loadSetsInit } from '../redux'
import { useSelector } from 'react-redux'

import { Set } from './Set'
import { useDispatchWithSender } from './useDispatchWithSender'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId, sets } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      sets: selectCurrentThemeSets(state)
    })
  )

  const dispatch = useDispatchWithSender('Theme')

  useEffect(() => {
    if (currentThemeId && (!sets || (!sets!.data && !sets!.loading))) {
      dispatch(loadSetsInit(currentThemeId))
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
