/* REFAC|EDITCOMMENT
Since our reducers (<span data-file-link="../slices/guessingGame/reducer"><code>guessingGameReducer</code></span>, <span data-file-link="../slices/rebrickable/reducer"><code>rebrickableReducer</code></span>, <span data-file-link="../slices/ui/reducer"><code>UIReducer</code></span>) now use the new `guard` from the action creator <span data-file-link="../lib/factory"><code>factory</code></span>, our `appAction` type no longer needs to be a union of all possible types.
*/

import { Action } from '../lib/types/action'

export type AppAction = Action<string, any>
