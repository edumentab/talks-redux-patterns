/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.

We also switch to use <span data-file-link="../../../types/appAction"><code>AppAction</code></span> instead of <span data-file-link="../../../lib/types/action"><code>Action</code></span>, since the former will now serve as a facade for the latter.
*/

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
