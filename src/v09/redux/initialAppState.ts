import { AppState } from './types/appState'
import { initialGuessingGameState } from './slices/guessingGame/initialState'
import { initialRebrickableState } from './slices/rebrickable/initialState'
import { initialUIState } from './slices/ui/initialState'

export const initialAppState: AppState = {
  rebrickable: initialRebrickableState,
  ui: initialUIState,
  guessingGame: initialGuessingGameState
}
