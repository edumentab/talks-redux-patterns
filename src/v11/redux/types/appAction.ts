import { Action } from '../lib/types/action'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppAction<T extends string = string, P = any> = Action<
  T,
  P,
  AppState,
  AppDeps
>
