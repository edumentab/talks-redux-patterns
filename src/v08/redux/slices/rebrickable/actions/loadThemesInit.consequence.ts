/* REFAC|EDITCOMMENT
These side effects used to live in <span data-file-link="../thunks/loadThemesThunk"><code>loadThemesThunk</code></span>, but with the introduction of <span data-file-link="../../../lib/types/consequence"><code>Consequences</code></span> they are moved here instead (as were the <span data-file-link="./loadThemesInit.consequence.test">tests</span>).

Similarly the effects in <span data-file-link="../thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> were moved to <span data-file-link="./loadSetsInit"><code>loadSetsInit.consequence</code></span>.
*/

import { AppCons } from '../../../types'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'
import { isLoadThemesInit } from './loadThemesInit'

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
