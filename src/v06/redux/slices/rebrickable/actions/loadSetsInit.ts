/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsInitPayload = number // the themeId for which to load sets

export type LoadSetsInitAction = Action<'LOAD_SETS_INIT', LoadSetsInitPayload>

export const [loadSetsInit, isLoadSetsInit] = factory<LoadSetsInitAction>({
  type: 'LOAD_SETS_INIT'
})
