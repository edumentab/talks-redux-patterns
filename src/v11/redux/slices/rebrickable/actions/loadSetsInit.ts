import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'
import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'

type LoadSetsInitPayload = number // the themeId for which to load sets

export type LoadSetsInitAction = AppActionMould<
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
    }),
  cons: ({ action, dispatch, deps }) => {
    const themeId = action.payload
    deps.rebrickable
      .getSetsForTheme(themeId)
      .then(data => dispatch(loadSetsSuccess({ themeId, data })))
      .catch(error => dispatch(loadSetsError({ themeId, error })))
  }
})
