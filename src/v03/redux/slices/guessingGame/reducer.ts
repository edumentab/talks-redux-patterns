import { GuessingGameState, GuessingGameActionNames } from './types'
import { initialGuessingGameState } from './initialState'
import { UIActionNames } from '../ui/types'
import { AppAction } from '../../types'
import produce from 'immer'

export function guessingGameReducer(
  state: GuessingGameState = initialGuessingGameState,
  action: AppAction
): GuessingGameState {
  switch (action.type) {
    case GuessingGameActionNames.MAKE_GUESS: {
      const { guess } = action.payload
      return produce(state, draft => {
        draft.guesses.push(guess)
      })
    }
    case UIActionNames.SET_CURRENT_SET:
    case UIActionNames.SET_CURRENT_THEME: {
      return produce(state, draft => {
        draft.guesses = []
      })
    }
    default:
      return state
  }
}
