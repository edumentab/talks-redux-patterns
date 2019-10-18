import { AppAction } from './appAction'
import { AppThunk } from './appThunk'
import { AppState } from './appState'

export type AppStore = {
  getState: () => AppState
  dispatch: (a: AppAction | AppThunk) => void
}
