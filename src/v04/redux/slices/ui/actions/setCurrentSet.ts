/* REFAC|EDITCOMMENT
Like with all action creators, we refactor `loadThemesSuccess` to use the new <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>.
*/

import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = Action<
  UIActionNames.SET_CURRENT_SET,
  SetCurrentSetPayload
>

export const setCurrentSet = factory<SetCurrentSetAction>({
  type: UIActionNames.SET_CURRENT_SET
})
