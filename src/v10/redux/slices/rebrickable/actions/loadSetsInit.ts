import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

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
    })
})
