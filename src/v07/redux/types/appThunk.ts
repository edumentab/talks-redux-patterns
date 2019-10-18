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
