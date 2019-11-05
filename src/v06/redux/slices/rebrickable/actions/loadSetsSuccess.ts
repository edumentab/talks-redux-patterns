/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.

We also switch to use <span data-file-link="../../../types/appAction"><code>AppAction</code></span> instead of <span data-file-link="../../../lib/types/action"><code>Action</code></span>, since the former will now serve as a facade for the latter.
*/

import { ById } from '../../../../types'
import { AppAction } from '../../../types/appAction'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = AppAction<
  'LOAD_SETS_SUCCESS',
  LoadSetsSuccessPayload
>

export const [loadSetsSuccess, isLoadSetsSuccess] = factory<
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: 'LOAD_SETS_SUCCESS',
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data })
})
