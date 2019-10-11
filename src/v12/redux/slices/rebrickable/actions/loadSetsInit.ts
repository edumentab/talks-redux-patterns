import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'

type LoadSetsInitPayload = {
  themeId: number
}

export type LoadSetsInitAction = AppActionMould<
  'LOAD_SETS_INIT',
  LoadSetsInitPayload
>

export const [loadSetsInit, isLoadSetsInit] = actionCreatorFactory<
  LoadSetsInitAction
>({
  type: 'LOAD_SETS_INIT',
  reducer: (state, payload) => {
    const { themeId } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets = {
        loading: true,
        error: null,
        data: null
      }
    })
  },
  consequence: ({ action, dispatch, dependencies }) => {
    const { themeId } = action.payload
    dependencies.rebrickable
      .getSetsForTheme(themeId)
      .then(data => dispatch(loadSetsSuccess({ themeId, data })))
      .catch(error => dispatch(loadSetsError({ themeId, error })))
  }
})
