import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = AppActionMould<
  'LOAD_SETS_ERROR',
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = actionCreatorFactory<
  LoadSetsErrorAction
>({
  type: 'LOAD_SETS_ERROR',
  isError: true,
  reducer: (state, payload) => {
    const { themeId, error } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.error = error
    })
  }
})
