import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'

type SetCurrentThemePayload = number

export type SetCurrentThemeAction = AppAction<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>({ type: 'SET_CURRENT_THEME' })
