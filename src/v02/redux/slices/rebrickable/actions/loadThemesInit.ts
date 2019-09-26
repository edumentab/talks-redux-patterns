import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'

export type LoadThemesInitAction = Action<
  RebrickableActionNames.LOAD_THEMES_INIT,
  undefined
>

export const loadThemesInit = (): LoadThemesInitAction => ({
  type: RebrickableActionNames.LOAD_THEMES_INIT
})
