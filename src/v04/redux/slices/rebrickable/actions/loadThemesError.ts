/* REFAC|EDITCOMMENT
Like with all action creators, we refactor `loadThemesError` to use the new <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>.
*/

import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = Action<
  RebrickableActionNames.LOAD_THEMES_ERROR,
  LoadThemesErrorPayload
>

export const loadThemesError = factory<LoadThemesErrorAction>({
  type: RebrickableActionNames.LOAD_THEMES_ERROR,
  isError: true
})
