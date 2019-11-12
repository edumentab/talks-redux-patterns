/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>rebrickableReducer</code></span>.

Note how we don't have to change the <span data-file-link="./loadThemesInit.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/rebrickable/actions/loadThemesInit.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'
import produce from 'immer'

export type LoadThemesInitAction = AppAction<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  {
    type: 'LOAD_THEMES_INIT',
    reducer: state => {
      return produce(state, draft => {
        draft.rebrickable.themes = {
          error: null,
          loading: true,
          data: null
        }
      })
    }
  }
)
