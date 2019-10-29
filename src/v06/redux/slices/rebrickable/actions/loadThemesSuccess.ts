import { Action } from '../../../lib/types/action'
import { ById } from '../../../../types'
import { Theme } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadThemesSuccessPayload = ById<Theme>

export type LoadThemesSuccessAction = Action<
  'LOAD_THEMES_SUCCESS',
  LoadThemesSuccessPayload
>

export const [loadThemesSuccess, isLoadThemesSuccess] = factory<
  LoadThemesSuccessAction
>({ type: 'LOAD_THEMES_SUCCESS' })
