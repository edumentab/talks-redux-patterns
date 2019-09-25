import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { ById } from '../../../types/util'
import { Theme } from '../../../../services/rebrickable/types'

type LoadThemesSuccessPayload = {
  data: ById<Theme>
}

export type LoadThemesSuccessAction = Action<
  RebrickableActionNames.LOAD_THEMES_SUCCESS,
  LoadThemesSuccessPayload
>

export const loadThemesSuccess = (
  data: ById<Theme>
): LoadThemesSuccessAction => ({
  type: RebrickableActionNames.LOAD_THEMES_SUCCESS,
  payload: { data }
})
