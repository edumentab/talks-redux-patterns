/* REFAC|EDITCOMMENT
We have to slightly tweak `AppAction` to accommodate for the fact that <span data-file-link="../lib/types/action"><code>Action</code></span> now takes `Dependencies` as a fourth generic parameter.

The same tweak was made in <span data-file-link="../lib/types/consequence"><code>Consequence</code></span> and <span data-file-link="../lib/types/creator"><code>Creator</code></span>.
*/

import { Action } from '../lib/types/action'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppAction<T extends string = string, P = any> = Action<
  T,
  P,
  AppState,
  AppDeps
>
