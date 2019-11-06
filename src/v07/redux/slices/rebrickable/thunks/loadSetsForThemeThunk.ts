/* REFAC|EDITCOMMENT
We are now passed <span data-file-link="../../../types/appDeps"><code>AppDeps</code></span> via the <span data-file-link="../../../lib/thunk"><code>thunk</code></span> middleware, populated in <span data-file-link="../../../makeStore"><code>makeStore</code></span>. This means we no longer have to do any mocking in the <span data-file-link="./loadSetsForThemeThunk.test">tests</span> for this thunk.

The same thing applies to <span data-file-link="./loadThemesThunk.test">testing</span> the <span data-file-link="./loadThemesThunk"><code>loadThemesThunk</code></span>.
*/

import { AppThunkCreator } from '../../../../redux'
import { loadSetsInit, loadSetsSuccess, loadSetsError } from '../actions'

export const loadSetsForThemeThunk: AppThunkCreator<number> = (
  themeId: number
) => (dispatch, getState, deps) => {
  dispatch(loadSetsInit(themeId))
  deps.rebrickable
    .getSetsForTheme(themeId)
    .then(data => dispatch(loadSetsSuccess(themeId, data)))
    .catch(error => dispatch(loadSetsError(themeId, error)))
}
