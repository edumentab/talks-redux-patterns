import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'

export type LoadThemesInitAction = AppActionMould<'LOAD_THEMES_INIT', undefined>

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
        .catch(error => dispatch(loadThemesError({ error })))
  }
)
