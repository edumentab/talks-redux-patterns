import { RebrickableState } from '../slices/rebrickable/types/state'
import { GuessingGameState } from '../slices/guessingGame/types/state'
import { UIState } from '../slices/ui/types/state'

export type AppState = {
  rebrickable: RebrickableState
  guessingGame: GuessingGameState
  ui: UIState
}
