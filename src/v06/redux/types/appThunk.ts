import { Thunk, ThunkCreator } from '../lib/types/thunk'

import { AppAction } from './appAction'
import { AppState } from './appState'

export type AppThunkCreator<O = undefined> = ThunkCreator<
  AppAction,
  AppState,
  O
>

export type AppThunk = Thunk<AppAction, AppState>
