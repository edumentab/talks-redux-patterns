/* REFAC|EDITCOMMENT
In this version we pass the <span data-file-link="../../../lib/types/consequence"><code>Consequence</code></span> definitions directly to the <span data-file-link="../../../lib/factory"><code>factory</code></span>. This allows us to move side effect triggers from the UI into the datalayer. We take advantage of that by moving the triggering of <span data-file-link="../../rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span> from the <span data-file-link="../../../../app/Theme"><code>Theme</code></span> component to here in `setCurrentTheme`.

In conjunction we move testing logic from <span data-file-link="../../../../app/Theme.test"><code>Theme.test</code></span> to <span data-file-link="./setCurrentTheme.test"><code>setCurrentTheme.test</code></span>.
*/

import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'
import { loadSetsInit } from '../../rebrickable/actions'

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
  },
  cons: ({ dispatch, getState }) => {
    const themeId = getState().ui.currentThemeId!
    const { sets } = getState().rebrickable.themes.data![themeId]
    if (!sets || (!sets!.data && !sets!.loading)) {
      dispatch(loadSetsInit(themeId))
    }
  }
})
