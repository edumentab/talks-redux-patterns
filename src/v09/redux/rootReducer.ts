import { combineReducers } from 'redux'
import { UIReducer } from './slices/ui/reducer'
import { guessingGameReducer } from './slices/guessingGame/reducer'
import { rebrickableReducer } from './slices/rebrickable/reducer'
import { AppAction } from './types/appAction'
import { AppState } from './types/appState'

export const rootReducer: (
  state: AppState | undefined,
  action: AppAction
) => AppState = combineReducers({
  rebrickable: rebrickableReducer,
  ui: UIReducer,
  guessingGame: guessingGameReducer
})
