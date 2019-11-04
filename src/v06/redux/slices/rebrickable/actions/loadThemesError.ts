/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = Action<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({ type: 'LOAD_THEMES_ERROR', isError: true })
