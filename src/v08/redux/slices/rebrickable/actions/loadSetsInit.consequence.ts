/* REFAC|EDITCOMMENT
These side effects used to live in <span data-file-link="../thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>, but with the introduction of <span data-file-link="../../../lib/types/consequence"><code>Consequences</code></span> they are moved here instead (as were the <span data-file-link="./loadSetsInit.consequence.test">tests</span>).

Similarly the effects in <span data-file-link="../thunks/loadThemesThunk"><code>loadThemesThunk</code></span> were moved to <span data-file-link="./loadThemesInit"><code>loadThemesInit.consequence</code></span>.
*/

import { AppCons } from '../../../types'
import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'
import { isLoadSetsInit } from './loadSetsInit'

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
