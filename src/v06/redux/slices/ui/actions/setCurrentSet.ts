/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = Action<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>({
  type: 'SET_CURRENT_SET'
})
