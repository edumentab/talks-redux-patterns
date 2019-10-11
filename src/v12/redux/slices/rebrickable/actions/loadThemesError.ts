import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

type LoadThemesErrorPayload = {
  error: string
}

export type LoadThemesErrorAction = AppActionMould<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = actionCreatorFactory<
  LoadThemesErrorAction
>({
  type: 'LOAD_THEMES_ERROR',
  isError: true,
  reducer: (state, payload) => {
    const { error } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.error = error
    })
  }
})
