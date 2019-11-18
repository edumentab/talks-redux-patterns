/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a <span data-file-link="../../../lib/types/reducer"><code>Reducer</code></span>, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>rebrickableReducer</code></span>.

Note how we don't have to change the <span data-file-link="./loadSetsSuccess.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/rebrickable/actions/loadSetsSuccess.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { ById } from '../../../../types'
import { AppAction } from '../../../types'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = AppAction<
  'LOAD_SETS_SUCCESS',
  LoadSetsSuccessPayload
>

export const [loadSetsSuccess, isLoadSetsSuccess] = factory<
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: 'LOAD_SETS_SUCCESS',
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data }),
  reducer: (state, payload) => {
    const { data, themeId } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.data = data
    })
  }
})
