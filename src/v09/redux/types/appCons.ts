import { Consequence, ConsequenceGetter } from '../lib/types/consequence'
import { AppAction } from './appAction'
import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppCons = Consequence<AppAction, AppState, AppDeps>
export type AppConsGetter = ConsequenceGetter<AppAction, AppState, AppDeps>
