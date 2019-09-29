import { RebrickableActionNames } from '../types/actionNames'
import { ById } from '../../../../utils'
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

export const loadSetsSuccess = factory<LoadSetsSuccessAction>(
  RebrickableActionNames.LOAD_SETS_SUCCESS
)
