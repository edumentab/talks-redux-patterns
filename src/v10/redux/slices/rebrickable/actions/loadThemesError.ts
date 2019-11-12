/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>rebrickableReducer</code></span>.

Note how we don't have to change the <span data-file-link="./loadThemesError.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/rebrickable/actions/loadThemesError.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = AppAction<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({
  type: 'LOAD_THEMES_ERROR',
  isError: true,
  reducer: (state, payload) => {
    const error = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.error = error
    })
  }
})
