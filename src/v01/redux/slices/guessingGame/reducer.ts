import { GuessingGameState, GuessingGameActionNames } from './types'
import { initialGuessingGameState } from './initialState'
import { UIActionNames } from '../ui/types'
import { AppAction } from '../../types'

export function guessingGameReducer(
  state: GuessingGameState = initialGuessingGameState,
  action: AppAction
): GuessingGameState {
  switch (action.type) {
    case GuessingGameActionNames.MAKE_GUESS: {
      return {
        ...state,
        guesses: state.guesses.concat(action.payload)
      }
    }
    case UIActionNames.SET_CURRENT_SET:
    case UIActionNames.SET_CURRENT_THEME: {
      return {
        ...state,
        guesses: []
      }
    }
    default:
      return state
  }
}
