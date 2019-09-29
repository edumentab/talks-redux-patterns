import { GuessingGameState } from './types'
import { initialGuessingGameState } from './initialState'
import { AppAction } from '../../types'
import produce from 'immer'
import { isMakeGuess } from './actions'
import { isSetCurrentSet, isSetCurrentTheme } from '../ui/actions'

export function guessingGameReducer(
  state: GuessingGameState = initialGuessingGameState,
  action: AppAction
): GuessingGameState {
  if (isMakeGuess(action)) {
    const { guess } = action.payload
    return produce(state, draft => {
      draft.guesses.push(guess)
    })
  }
  if (isSetCurrentSet(action) || isSetCurrentTheme(action)) {
    return produce(state, draft => {
      draft.guesses = []
    })
  }
  return state
}
