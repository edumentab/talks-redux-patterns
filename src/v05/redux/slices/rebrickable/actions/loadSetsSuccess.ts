import { RebrickableActionNames } from '../types/actionNames'
import { ById } from '../../../../types'
import { Action } from '../../../lib/types/action'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = Action<
  RebrickableActionNames.LOAD_SETS_SUCCESS,
  LoadSetsSuccessPayload
>

export const loadSetsSuccess = factory<
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: RebrickableActionNames.LOAD_SETS_SUCCESS,
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data })
})
