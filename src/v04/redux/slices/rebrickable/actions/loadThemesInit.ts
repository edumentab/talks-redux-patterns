/* REFAC|EDITCOMMENT
This is the only action in our app with undefined payload, meaning it has an empty signature: `loadThemesInit()`.

The <span data-file-link="../../../lib/types/creator.ts"><code>Creator</code> type</span> handles this for us by casting this creator as a `NakedActionCreator`.
*/

import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

export type LoadThemesInitAction = Action<
  RebrickableActionNames.LOAD_THEMES_INIT,
  undefined
>

export const loadThemesInit = factory<LoadThemesInitAction>({
  type: RebrickableActionNames.LOAD_THEMES_INIT
})
