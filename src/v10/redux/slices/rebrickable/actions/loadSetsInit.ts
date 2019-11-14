/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>rebrickableReducer</code></span>.

Note how we don't have to change the <span data-file-link="./loadSetsInit.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/rebrickable/actions/loadSetsInit.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction, AppCons } from '../../../types'
import { factory } from '../../../lib/factory'
import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'
import produce from 'immer'

type LoadSetsInitPayload = number // the themeId for which to load sets

export type LoadSetsInitAction = AppAction<
  'LOAD_SETS_INIT',
  LoadSetsInitPayload
>

export const [loadSetsInit, isLoadSetsInit] = factory<LoadSetsInitAction>({
  type: 'LOAD_SETS_INIT',
  reducer: (state, payload) =>
    produce(state, draft => {
      draft.rebrickable.themes.data![payload].sets = {
        loading: true,
        error: null,
        data: null
      }
    })
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
