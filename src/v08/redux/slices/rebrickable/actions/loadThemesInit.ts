/* REFAC|EDITCOMMENT
The side effects that used to live in <span data-file-link="../thunks/loadThemesThunk"><code>loadThemesThunk</code></span> are now refactored to be a <span data-file-link="../../../lib/types/consequence"><code>Consequence</code></span> here instead. It will be passed to the <span data-file-link="../../../lib/consequence"><code>consequenceMiddleware</code></span> via the `consGetter` defined in <span data-file-link="../../../makeStore"><code>makeStore</code></span>.

The tests for these effects have similarly moved from <span data-file-link="../thunks/loadThemesThunk.test"><code>loadThemesThunk.test</code></span> into <span data-file-link="./loadSetsInit.test">our tests</span>.

Similarly the effects in <span data-file-link="../thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> were moved to be a <span data-file-link="./loadSetsInit"><code>loadSetsInit</code> consequence</span>.
*/

import { AppAction, AppCons } from '../../../types'
import { factory } from '../../../lib/factory'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'

export type LoadThemesInitAction = AppAction<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  {
    type: 'LOAD_THEMES_INIT'
  }
)

export const loadThemesInitConsequence: AppCons = ({
  action,
  dispatch,
  deps
}) => {
  if (isLoadThemesInit(action)) {
    deps.rebrickable
      .getThemesByParent(186)
      .then(data => dispatch(loadThemesSuccess(data)))
      .catch(err => dispatch(loadThemesError(err)))
  }
}
