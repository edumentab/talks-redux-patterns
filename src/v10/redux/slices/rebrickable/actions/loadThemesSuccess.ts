/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>rebrickableReducer</code></span>.

Note how we don't have to change the <span data-file-link="./loadThemesSuccess.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/rebrickable/actions/loadThemesSuccess.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types'
import { ById } from '../../../../types'
import { Theme } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadThemesSuccessPayload = ById<Theme>

export type LoadThemesSuccessAction = AppAction<
  'LOAD_THEMES_SUCCESS',
  LoadThemesSuccessPayload
>

export const [loadThemesSuccess, isLoadThemesSuccess] = factory<
  LoadThemesSuccessAction
>({
  type: 'LOAD_THEMES_SUCCESS',
  reducer: (state, payload) => {
    const data = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.data = data
    })
  }
})
