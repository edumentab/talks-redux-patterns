import { RebrickableActionNames } from '../types/actionNames'
import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadThemesErrorPayload = {
  error: string
}

export type LoadThemesErrorAction = AppActionMould<
  RebrickableActionNames.LOAD_THEMES_ERROR,
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({
  type: RebrickableActionNames.LOAD_THEMES_ERROR,
  isError: true,
  reducer: (state, payload) => {
    const { error } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.error = error
    })
  }
})
