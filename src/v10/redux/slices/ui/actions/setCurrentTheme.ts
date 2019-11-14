/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>uiReducer</code></span> and <span data-file-link="../../guessingGame/reducer"><code>guessingGameReducer</code></span> (since `setCurrentTheme` affects both slices).

Note how we don't have to change the <span data-file-link="./setCurrentTheme.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/ui/actions/setCurrentTheme.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type SetCurrentThemePayload = number

export type SetCurrentThemeAction = AppAction<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>({
  type: 'SET_CURRENT_THEME',
  reducer: (state, payload) => {
    return produce(state, draft => {
      draft.ui.currentThemeId = payload
      draft.ui.currentSetId = null
      draft.guessingGame.guesses = []
    })
  }
})
