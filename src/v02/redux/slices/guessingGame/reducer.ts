/* REFAC|EDITCOMMENT
For shallow state manipulations such as in this reducer, introducing Immer isn't that big a win. See the <span data-file-link="redux/slices/rebrickable/reducer.ts">Rebrickable reducer</span> for a bigger gain!
*/

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
        draft.guesses.push(action.payload)
        return
      }
      case UIActionNames.SET_CURRENT_SET:
      case UIActionNames.SET_CURRENT_THEME: {
        draft.guesses = []
        return
      }
    }
  })
