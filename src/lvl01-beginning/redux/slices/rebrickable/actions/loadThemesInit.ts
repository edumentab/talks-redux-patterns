import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../types/util'

export type LoadThemesInitAction = Action<
  RebrickableActionNames.LOAD_THEMES_INIT,
  undefined
>

export const loadThemesInit = (themeId: number): LoadThemesInitAction => ({
  type: RebrickableActionNames.LOAD_THEMES_INIT
})
