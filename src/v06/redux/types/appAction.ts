/* REFAC|EDITCOMMENT
Since our reducers (<span data-file-link="../slices/guessingGame/reducer"><code>guessingGameReducer</code></span>, <span data-file-link="../slices/rebrickable/reducer"><code>rebrickableReducer</code></span>, <span data-file-link="../slices/ui/reducer"><code>UIReducer</code></span>) now use the new `guard` from the action creator <span data-file-link="../lib/factory"><code>factory</code></span>, our `appAction` type no longer needs to be a union of all possible types.

Instead we make it a facade for the <span data-file-link="../lib/types/action"><code>Action</code></span> type, for the action creators to use. That won't give us anything right now, but much like the <span data-file-link="../lib/factory"><code>factory</code></span> it will be an entry point for future functionality.
*/

import { Action } from '../lib/types/action'

export type AppAction<T extends string = string, P = any> = Action<T, P>
