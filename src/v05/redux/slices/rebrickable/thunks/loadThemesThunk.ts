/* REFAC|EDITCOMMENT
This <span data-file-link="../../../types/appThunk"><code>AppThunk</code></span> contains side effect logic extracted from the <span data-file-link="../../../../app/Main.tsx"><code>Main.tsx</code></span> component.

Similarly that means that the <span data-file-link="./loadThemesThunk.test">tests for this thunk</span> is mostly made up of tests moved out of the <span data-file-link="../../../../app/Main.test"><code>Main</code> tests</span>.
*/

import { AppThunkCreator } from '../../../../redux'
import { rebrickableService } from '../../../../services'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../actions'

export const loadThemesThunk: AppThunkCreator = () => dispatch => {
  dispatch(loadThemesInit())
  rebrickableService
    .getThemesByParent(186)
    .then(data => dispatch(loadThemesSuccess(data)))
    .catch(err => dispatch(loadThemesError(err)))
}
