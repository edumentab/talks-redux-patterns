import { Consequence, ConsequenceGetter } from 'conduxion'

import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppCons = Consequence<AppState, AppDeps>
export type AppConsGetter = ConsequenceGetter<AppState, AppDeps>
