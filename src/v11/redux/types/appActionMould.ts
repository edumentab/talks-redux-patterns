import { Action } from '../lib/types/action'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppActionMould<T extends string, P> = Action<
  T,
  P,
  AppState,
  AppDeps
>
