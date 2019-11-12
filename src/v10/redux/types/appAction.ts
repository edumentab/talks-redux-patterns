/* REFAC|EDITCOMMENT
The basic <span data-file-link="../lib/types/action"><code>Action</code></span> shape generic parameter list now also includes app state, so we must add that here.
*/

import { Action } from '../lib/types/action'
import { AppState } from './appState'

export type AppAction<T extends string = string, P = any> = Action<
  T,
  P,
  AppState
>
