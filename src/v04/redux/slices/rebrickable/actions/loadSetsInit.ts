/* REFAC|EDITCOMMENT
Like with all action creators, we refactor `loadSetsInit` to use the new <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>.
*/

import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsInitPayload = number // the themeId for which to load sets

export type LoadSetsInitAction = Action<
  RebrickableActionNames.LOAD_SETS_INIT,
  LoadSetsInitPayload
>

export const loadSetsInit = factory<LoadSetsInitAction>({
  type: RebrickableActionNames.LOAD_SETS_INIT
})
