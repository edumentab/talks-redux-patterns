/* REFAC|EDITCOMMENT
Just like in <span data-file-link="../guessingGame/reducer"><code>guessingGameReducer</code></span> and <span data-file-link="../rebrickable/reducer"><code>rebrickableReducer</code></span>, we'll exchange the old `switch` statements for the new guards created by the action creator <span data-file-link="../../lib/factory"><code>factory</code></span>.

This makes for more readable code, and we no longer need the <span data-file-link="./types/actionNames"><code>actionNames</code> type union</span>.
*/

import { UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'
import produce from 'immer'
import { isSetCurrentSet, isSetCurrentTheme } from './actions'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState =>
  produce(state, draft => {
    if (isSetCurrentSet(action)) {
      draft.currentSetId = action.payload
      return
    }
    if (isSetCurrentTheme(action)) {
      draft.currentThemeId = action.payload
      draft.currentSetId = null
      return
    }
  })
