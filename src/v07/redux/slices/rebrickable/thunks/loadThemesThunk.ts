/* REFAC|EDITCOMMENT
We are now passed <span data-file-link="../../../types/appDeps"><code>AppDeps</code></span> via the <span data-file-link="../../../lib/thunk"><code>thunk</code></span> middleware, populated in <span data-file-link="../../../makeStore"><code>makeStore</code></span>. This means we no longer have to do any mocking in the <span data-file-link="./loadThemesThunk.test">tests</span> for this thunk.

The same thing applies to <span data-file-link="./loadSetsForThemeThunk.test">testing</span> the <span data-file-link="./loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>.
*/

import { AppThunkCreator } from '../../../../redux'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../actions'

export const loadThemesThunk: AppThunkCreator = () => (
  dispatch,
  getState,
  deps
) => {
  dispatch(loadThemesInit())
  deps.rebrickable
    .getThemesByParent(186)
    .then(data => dispatch(loadThemesSuccess(data)))
    .catch(err => dispatch(loadThemesError(err)))
}
