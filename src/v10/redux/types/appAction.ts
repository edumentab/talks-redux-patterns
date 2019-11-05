import { Action } from '../lib/types/action'
import { AppState } from './appState'

export type AppAction<T extends string = string, P = any> = Action<
  T,
  P,
  AppState
>
