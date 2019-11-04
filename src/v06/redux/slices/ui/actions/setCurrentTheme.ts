/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type SetCurrentThemePayload = number

export type SetCurrentThemeAction = Action<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>({ type: 'SET_CURRENT_THEME' })
