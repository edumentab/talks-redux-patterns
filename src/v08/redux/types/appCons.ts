/* REFAC|EDITCOMMENT
The `AppCons` is our app-specific versions of the new <span data-file-link="../lib/types/consequence"><code>Consequence</code></span> type.

It is consumsed by the consequence definitions for <span data-file-link="../slices/rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span> and <span data-file-link="../slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> (which replace the corresponding deleted thunks).
*/

import { Consequence, ConsequenceGetter } from '../lib/types/consequence'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppCons = Consequence<AppState, AppDeps>
export type AppConsGetter = ConsequenceGetter<AppState, AppDeps>
