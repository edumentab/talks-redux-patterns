import { ConduxionAction } from 'conduxion'

import { AppState } from './appState'
import { AppDeps } from './appDeps'

export type AppAction = ConduxionAction<AppState, AppDeps>
