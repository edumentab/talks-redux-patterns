import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = Action<
  RebrickableActionNames.LOAD_SETS_ERROR,
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<LoadSetsErrorAction>(
  RebrickableActionNames.LOAD_SETS_ERROR,
  true
)
