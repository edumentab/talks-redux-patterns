import { Consequence, ConsequenceGetter } from '../lib/types/consequence'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppCons = Consequence<AppState, AppDeps>
export type AppConsGetter = ConsequenceGetter<AppState, AppDeps>
