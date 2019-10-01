import { GuessingGameState, GuessingGameActionNames } from './types'
import { initialGuessingGameState } from './initialState'
import { UIActionNames } from '../ui/types'
import { AppAction } from '../../types'
import produce from 'immer'

export const guessingGameReducer = (
  state: GuessingGameState = initialGuessingGameState,
  action: AppAction
): GuessingGameState =>
  produce(state, draft => {
    switch (action.type) {
      case GuessingGameActionNames.MAKE_GUESS: {
        const { guess } = action.payload
        draft.guesses.push(guess)
        return
      }
      case UIActionNames.SET_CURRENT_SET:
      case UIActionNames.SET_CURRENT_THEME: {
        draft.guesses = []
        return
      }
    }
  })
