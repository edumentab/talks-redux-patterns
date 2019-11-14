/* REFAC|EDITCOMMENT
In this version we pass the consequence definitions to the <span data-file-link="../../../lib/factory"><code>factory</code></span> instead, so <span data-file-link="./loadThemesInit.consequence"><code>loadThemesInit.consequence</code></span> has now been inlined here.

The same thing happened in <span data-file-link="./loadSetsInit"><code>loadSetsInit</code></span>.
*/

import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'
import produce from 'immer'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'

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
    },
    cons: ({ dispatch, deps }) =>
      deps.rebrickable
        .getThemesByParent(186)
        .then(data => dispatch(loadThemesSuccess(data)))
        .catch(err => dispatch(loadThemesError(err)))
  }
)
