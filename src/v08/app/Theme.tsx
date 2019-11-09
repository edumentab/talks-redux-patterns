/* REFAC|EDITCOMMENT
There are no <span data-file-link="../redux/lib/types/thunk"><code>Thunks</code></span> anymore, so instead of dispatching a <span data-file-link="../redux/slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> we dispatch a <span data-file-link="../redux/slices/rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span> action. The side effects that used to live in the thunk are now a <span data-file-link="../redux/slices/rebrickable/actions/loadSetsInit.consequence">consequence</span> of that action instead. This also means that the tests <span data-file-link="./Theme.test">tests</span> for this component were simplified.

A very similar change happened in the <span data-file-link="./Main">Main</span> component.
*/

import React, { FunctionComponent, useEffect } from 'react'

import { SetSelector } from './SetSelector'
import { AppState, selectCurrentThemeSets, loadSetsInit } from '../redux'
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
