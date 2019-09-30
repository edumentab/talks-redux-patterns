import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type SetCurrentThemePayload = {
  themeId: number
}

export type SetCurrentThemeAction = Action<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>('SET_CURRENT_THEME')
