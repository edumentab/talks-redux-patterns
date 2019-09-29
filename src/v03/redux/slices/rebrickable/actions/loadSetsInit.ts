import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'

type LoadSetsInitPayload = {
  themeId: number
}

export type LoadSetsInitAction = Action<
  RebrickableActionNames.LOAD_SETS_INIT,
  LoadSetsInitPayload
>

export const loadSetsInit = (themeId: number): LoadSetsInitAction => ({
  type: RebrickableActionNames.LOAD_SETS_INIT,
  payload: { themeId }
})