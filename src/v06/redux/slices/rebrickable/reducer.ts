/* REFAC|EDITCOMMENT
Just like in <span data-file-link="../guessingGame/reducer"><code>guessingGameReducer</code></span> and <span data-file-link="../ui/reducer"><code>UIReducer</code></span>, we'll exchange the old `switch` statements for the new guards created by the action creator <span data-file-link="../../lib/factory"><code>factory</code></span>.

This makes for more readable code, and we no longer need the <span data-file-link="./types/actionNames"><code>RebrickableActionNames</code></span> type union.
*/

import { RebrickableState } from './types/state'
import { AppAction } from '../../types/appAction'
import { initialRebrickableState } from './initialState'
import produce from 'immer'
import {
  isLoadThemesInit,
  isLoadThemesError,
  isLoadThemesSuccess,
  isLoadSetsInit,
  isLoadSetsError,
  isLoadSetsSuccess
} from './actions'

export const rebrickableReducer = (
  state: RebrickableState = initialRebrickableState,
  action: AppAction
): RebrickableState =>
  produce(state, draft => {
    if (isLoadThemesInit(action)) {
      draft.themes = {
        error: null,
        loading: true,
        data: null
      }
      return
    }
    if (isLoadThemesError(action)) {
      const error = action.payload
      draft.themes.loading = false
      draft.themes.error = error
      return
    }
    if (isLoadThemesSuccess(action)) {
      const data = action.payload
      draft.themes.loading = false
      draft.themes.data = data
      return
    }
    if (isLoadSetsInit(action)) {
      const themeId = action.payload
      draft.themes.data![themeId].sets = {
        loading: true,
        error: null,
        data: null
      }
      return
    }
    if (isLoadSetsError(action)) {
      const { themeId, error } = action.payload
      draft.themes.data![themeId].sets.loading = false
      draft.themes.data![themeId].sets.error = error
      return
    }
    if (isLoadSetsSuccess(action)) {
      const { data, themeId } = action.payload
      draft.themes.data![themeId].sets.loading = false
      draft.themes.data![themeId].sets.data = data
      return
    }
  })
