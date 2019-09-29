import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'
import { factory } from '../../../lib/factory'

type SetCurrentThemePayload = {
  themeId: number
}

export type SetCurrentThemeAction = Action<
  UIActionNames.SET_CURRENT_THEME,
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>(UIActionNames.SET_CURRENT_THEME)
