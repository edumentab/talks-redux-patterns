import { Action } from '../lib/types/action'
import { AppState } from './appState'

export type AppActionMould<T extends string, P> = Action<T, P, AppState>
