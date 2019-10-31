/* REFAC|EDITCOMMENT
Note how we here provide a `mapper` to the <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>, to allow us to retain the `(themeId, data)` signature. 

We do much the same thing in <span data-file-link="./loadSetsError.ts"><code>loadSetsError</code></span>.
*/

import { RebrickableActionNames } from '../types/actionNames'
import { ById } from '../../../../types'
import { Action } from '../../../lib/types/action'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = Action<
  RebrickableActionNames.LOAD_SETS_SUCCESS,
  LoadSetsSuccessPayload
>

export const loadSetsSuccess = factory<
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: RebrickableActionNames.LOAD_SETS_SUCCESS,
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data })
})
