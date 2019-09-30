import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

export type LoadThemesInitAction = Action<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  'LOAD_THEMES_INIT'
)
