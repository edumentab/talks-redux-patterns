import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'

type SetCurrentThemePayload = {
  themeId: number
}

export type SetCurrentThemeAction = Action<
  UIActionNames.SET_CURRENT_THEME,
  SetCurrentThemePayload
>

export const setCurrentTheme = (themeId: number): SetCurrentThemeAction => ({
  type: UIActionNames.SET_CURRENT_THEME,
  payload: { themeId }
})
