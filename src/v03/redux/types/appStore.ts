import { Store } from 'redux'
import { AppAction } from './appAction'
import { AppState } from './appState'

export type AppStore = Store<AppState, AppAction>
