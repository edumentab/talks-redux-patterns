/* REFAC|EDITCOMMENT
Like with all action creators, we refactor `loadThemesSuccess` to use the new <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>.
*/

import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types/actionNames'
import { factory } from '../../../lib/factory'

type SetCurrentThemePayload = number

export type SetCurrentThemeAction = Action<
  UIActionNames.SET_CURRENT_THEME,
  SetCurrentThemePayload
>

export const setCurrentTheme = factory<SetCurrentThemeAction>({
  type: UIActionNames.SET_CURRENT_THEME
})
