import { GuessingGameState } from './types/state'
import { initialGuessingGameState } from './initialState'
import { AppAction } from '../../types'
import produce from 'immer'
import { isMakeGuess } from './actions'
import { isSetCurrentSet, isSetCurrentTheme } from '../ui/actions'

export const guessingGameReducer = (
  state: GuessingGameState = initialGuessingGameState,
  action: AppAction
): GuessingGameState =>
  produce(state, draft => {
    if (isMakeGuess(action)) {
      draft.guesses.push(action.payload)
      return
    }
    if (isSetCurrentSet(action) || isSetCurrentTheme(action)) {
      draft.guesses = []
      return
    }
  })
