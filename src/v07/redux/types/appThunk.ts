/* REFAC|EDITCOMMENT
Our `AppThunk` now includes the new <span data-file-link="./appDeps"><code>AppDeps</code></span> type, which will be injected by <span data-file-link="../makeStore"><code>makeStore</code></span> via the <span data-file-link="../lib/thunk"><code>thunk</code> middleware</span>.
*/

import { Thunk, ThunkCreator } from '../lib/types/thunk'

import { AppAction } from './appAction'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppThunkCreator<O = undefined> = ThunkCreator<
  AppAction,
  AppState,
  AppDeps,
  O
>

export type AppThunk = Thunk<AppAction, AppState, AppDeps>
