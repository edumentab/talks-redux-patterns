import { RebrickableActionNames } from '../types/actionNames'
import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = AppActionMould<
  RebrickableActionNames.LOAD_SETS_ERROR,
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<LoadSetsErrorAction>({
  type: RebrickableActionNames.LOAD_SETS_ERROR,
  isError: true,
  reducer: (state, payload) => {
    const { themeId, error } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.error = error
    })
  }
})
