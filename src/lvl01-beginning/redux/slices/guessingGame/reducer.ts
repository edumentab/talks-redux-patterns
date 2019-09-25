import { MakeGuessAction, ResetGameAction } from './actions'
import { GuessingGameState, GuessingGameActionNames } from './types'

type GuessingGameAction = MakeGuessAction | ResetGameAction

export function guessingGameReducer(
  state: GuessingGameState,
  action: GuessingGameAction
): GuessingGameState {
  switch (action.type) {
    case GuessingGameActionNames.MAKE_GUESS:
      return {
        ...state,
        guesses: state.guesses.concat(action.payload.guess)
      }
    case GuessingGameActionNames.RESET_GAME:
      return {
        maxGuesses: action.payload.maxGuesses,
        guesses: []
      }
    default:
      return state
  }
}
