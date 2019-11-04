/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = Action<
  'LOAD_SETS_ERROR',
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<
  LoadSetsErrorAction,
  [number, string]
>({
  type: 'LOAD_SETS_ERROR',
  isError: true,
  mapper: (themeId: number, error: string) => ({ themeId, error })
})
