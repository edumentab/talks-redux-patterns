import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = AppAction<
  'LOAD_SETS_ERROR',
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<
  LoadSetsErrorAction,
  [number, string]
>({
  type: 'LOAD_SETS_ERROR',
  isError: true,
  mapper: (themeId: number, error: string) => ({ themeId, error }),
  reducer: (state, payload) => {
    const { themeId, error } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.error = error
    })
  }
})
