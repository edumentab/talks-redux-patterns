/* REFAC|EDITCOMMENT
We extracted the side effect logic from this component into <span data-file-link="../redux/slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>. This means we can similarly simplify <span data-file-link="./Theme.test"><code>Theme.test</code></span>, since the responsibility for testing the side effect logic now resides in <span data-file-link="../redux/slices/rebrickable/thunks/loadSetsForThemeThunk.test"><code>loadSetsForThemeThunk.test</code></span>. That is advantageous since the latter is just a function unconcerned with the UI, thus easier to test.

The same thing happened in <span data-file-link="./Main"><code>Main</code></span> and <span data-file-link="../redux/slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span>.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import {
  AppState,
  selectCurrentThemeSets,
  loadSetsForThemeThunk
} from '../redux'
import { useSelector, useDispatch } from 'react-redux'

import { Set } from './Set'

export const Theme: FunctionComponent = () => {
  const { currentThemeId, currentSetId, sets } = useSelector(
    (state: AppState) => ({
      ...state.ui,
      sets: selectCurrentThemeSets(state)
    })
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentThemeId && (!sets || (!sets!.data && !sets!.loading))) {
      dispatch(loadSetsForThemeThunk(currentThemeId))
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
