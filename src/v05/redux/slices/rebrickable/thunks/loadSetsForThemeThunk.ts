/* REFAC|EDITCOMMENT
This <span data-file-link="../../../types/appThunk"><code>AppThunk</code></span> contains side effect logic extracted from the <span data-file-link="../../../../app/Theme.tsx"><code>Theme.tsx</code></span> component.

Similarly that means that the <span data-file-link="./loadSetsForThemeThunk.test">tests for this thunk</span> is mostly made up of tests moved out of the <span data-file-link="../../../../app/Theme.test"><code>Theme</code> tests</span>.
*/

import { AppThunkCreator } from '../../../../redux'
import { rebrickableService } from '../../../../services'
import { loadSetsInit, loadSetsSuccess, loadSetsError } from '../actions'

export const loadSetsForThemeThunk: AppThunkCreator<number> = (
  themeId: number
) => dispatch => {
  dispatch(loadSetsInit(themeId))
  rebrickableService
    .getSetsForTheme(themeId)
    .then(data => dispatch(loadSetsSuccess(themeId, data)))
    .catch(error => dispatch(loadSetsError(themeId, error)))
}
