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
  return produce(state, draft => {
    if (isMakeGuess(action)) {
      const { guess } = action.payload
      draft.guesses.push(guess)
      return
    }
    if (isSetCurrentSet(action) || isSetCurrentTheme(action)) {
      draft.guesses = []
      return
    }
    return
  })
}
