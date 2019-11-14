import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = AppAction<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({
  type: 'LOAD_THEMES_ERROR',
  isError: true,
  reducer: (state, payload) => {
    const error = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.error = error
    })
  }
})
