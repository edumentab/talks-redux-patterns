import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

export type LoadThemesInitAction = Action<
  RebrickableActionNames.LOAD_THEMES_INIT,
  undefined
>

export const loadThemesInit = factory<LoadThemesInitAction>({
  type: RebrickableActionNames.LOAD_THEMES_INIT
})
