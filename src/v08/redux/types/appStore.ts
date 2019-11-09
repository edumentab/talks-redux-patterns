/* REFAC|EDITCOMMENT
Since we are getting rid of the <span data-file-link="./appThunk"><code>AppThunk</code></span> concept in this version, we don't need a special signature for `AppStore` anymore.

Instead we can revert to defining `AppStore` (which is used in <span data-file-link="../makeStore"><code>makeStore</code></span>) using the regular `Store` generic from `Redux`.
*/

import { Store } from 'redux'
import { AppAction } from './appAction'
import { AppState } from './appState'

export type AppStore = Store<AppState, AppAction>
