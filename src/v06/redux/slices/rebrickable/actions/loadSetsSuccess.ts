/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { ById } from '../../../../types'
import { Action } from '../../../lib/types/action'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = Action<
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
