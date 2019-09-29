import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { ById } from '../../../../utilTypes'
import { Theme } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadThemesSuccessPayload = {
  data: ById<Theme>
}

export type LoadThemesSuccessAction = Action<
  RebrickableActionNames.LOAD_THEMES_SUCCESS,
  LoadThemesSuccessPayload
>

export const [loadThemesSuccess, isLoadThemesSuccess] = factory<
  LoadThemesSuccessAction
>(RebrickableActionNames.LOAD_THEMES_SUCCESS)
