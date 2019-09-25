import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../types/util'

type LoadThemesErrorPayload = {
  error: string
}

export type LoadThemesErrorAction = Action<
  RebrickableActionNames.LOAD_THEMES_ERROR,
  LoadThemesErrorPayload
>

export const loadThemesError = (error: string): LoadThemesErrorAction => ({
  type: RebrickableActionNames.LOAD_THEMES_ERROR,
  payload: { error },
  error: true
})
