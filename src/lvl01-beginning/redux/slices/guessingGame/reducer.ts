import { MakeGuessAction, ResetGameAction } from './actions'
import { GuessingGameState, GuessingGameActionNames } from './types'
import { initialGuessingGameState } from './initialState'

type GuessingGameAction = MakeGuessAction | ResetGameAction

export function guessingGameReducer(
  state: GuessingGameState = initialGuessingGameState,
  action: GuessingGameAction
): GuessingGameState {
  switch (action.type) {
    case GuessingGameActionNames.MAKE_GUESS: {
      const { guess } = action.payload
      return {
        ...state,
        guesses: state.guesses.concat(guess)
      }
    }
    case GuessingGameActionNames.RESET_GAME: {
      const { maxGuesses } = action.payload
      return {
        maxGuesses,
        guesses: []
      }
    }
    default:
      return state
  }
}
