import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'

export type LoadThemesInitAction = AppActionMould<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = actionCreatorFactory<
  LoadThemesInitAction
>({
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
  consequence: ({ dispatch, dependencies }) =>
    dependencies.rebrickable
      .getThemesByParent(186)
      .then(data => dispatch(loadThemesSuccess({ data })))
      .catch(error => dispatch(loadThemesError({ error })))
})
