import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../types/util'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = Action<
  RebrickableActionNames.LOAD_SETS_ERROR,
  LoadSetsErrorPayload
>

export const loadSetsError = (
  themeId: number,
  error: string
): LoadSetsErrorAction => ({
  type: RebrickableActionNames.LOAD_SETS_ERROR,
  payload: { error, themeId },
  error: true
})
