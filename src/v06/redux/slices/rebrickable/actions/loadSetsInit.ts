import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsInitPayload = {
  themeId: number
}

export type LoadSetsInitAction = Action<
  RebrickableActionNames.LOAD_SETS_INIT,
  LoadSetsInitPayload
>

export const loadSetsInit = factory<LoadSetsInitAction>(
  RebrickableActionNames.LOAD_SETS_INIT
)
