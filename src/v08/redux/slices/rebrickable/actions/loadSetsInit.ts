/* REFAC|EDITCOMMENT
The side effects that used to live in <span data-file-link="../thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> are now refactored to be a <span data-file-link="../../../lib/types/consequence"><code>Consequence</code></span> here instead. It will be passed to the <span data-file-link="../../../lib/consequence"><code>consequenceMiddleware</code></span> via the `consGetter` defined in <span data-file-link="../../../makeStore"><code>makeStore</code></span>.

The tests for these effects have similarly moved from <span data-file-link="../thunks/loadSetsForThemeThunk.test"><code>loadSetsForThemeThunk.test</code></span> into <span data-file-link="./loadSetsInit.test">our tests</span>.

Similarly the effects in <span data-file-link="../thunks/loadThemesThunk"><code>loadThemesThunk</code></span> were moved to be a <span data-file-link="./loadThemesInit"><code>loadThemesInit</code> consequence</span>.
*/

import { AppAction, AppCons } from '../../../types'
import { factory } from '../../../lib/factory'
import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'

type LoadSetsInitPayload = number // the themeId for which to load sets

export type LoadSetsInitAction = AppAction<
  'LOAD_SETS_INIT',
  LoadSetsInitPayload
>

export const [loadSetsInit, isLoadSetsInit] = factory<LoadSetsInitAction>({
  type: 'LOAD_SETS_INIT'
})

export const loadSetsInitConsequence: AppCons = ({
  action,
  dispatch,
  deps
}) => {
  if (isLoadSetsInit(action)) {
    const themeId = action.payload
    deps.rebrickable
      .getSetsForTheme(themeId)
      .then(data => dispatch(loadSetsSuccess(themeId, data)))
      .catch(error => dispatch(loadSetsError(themeId, error)))
  }
}
