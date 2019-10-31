/* REFAC|EDITCOMMENT
Note how we here provide a `mapper` to the <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>, to allow us to retain the `(themeId, error)` signature. 

We do much the same thing in <span data-file-link="./loadSetsSuccess.ts"><code>loadSetsSuccess</code></span>.
*/

import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = Action<
  RebrickableActionNames.LOAD_SETS_ERROR,
  LoadSetsErrorPayload
>

export const loadSetsError = factory<LoadSetsErrorAction, [number, string]>({
  type: RebrickableActionNames.LOAD_SETS_ERROR,
  isError: true,
  mapper: (themeId: number, error: string) => ({ themeId, error })
})
