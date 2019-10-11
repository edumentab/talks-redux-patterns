import { ConduxionActionMould } from 'conduxion'

import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppActionMould<T extends string, P> = ConduxionActionMould<
  T,
  P,
  AppState,
  AppDeps
>
