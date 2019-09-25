import { RebrickableActionNames } from '../types/actionNames'
import { ById } from '../../../types/util'
import { Action } from '../../../lib/types/action'
import { Set } from '../../../../services/rebrickable/types'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = Action<
  RebrickableActionNames.LOAD_SETS_SUCCESS,
  LoadSetsSuccessPayload
>

export const loadSetsSuccess = (
  themeId: number,
  data: ById<Set>
): LoadSetsSuccessAction => ({
  type: RebrickableActionNames.LOAD_SETS_SUCCESS,
  payload: { data, themeId }
})
