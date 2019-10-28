import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { ById } from '../../../../types'
import { Theme } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadThemesSuccessPayload = ById<Theme>

export type LoadThemesSuccessAction = Action<
  RebrickableActionNames.LOAD_THEMES_SUCCESS,
  LoadThemesSuccessPayload
>

export const loadThemesSuccess = factory<LoadThemesSuccessAction>({
  type: RebrickableActionNames.LOAD_THEMES_SUCCESS
})
