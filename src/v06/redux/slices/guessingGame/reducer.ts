/* REFAC|EDITCOMMENT
Just like in <span data-file-link="../rebrickable/reducer"><code>rebrickableReducer</code></span> and <span data-file-link="../ui/reducer"><code>UIReducer</code></span>, we'll exchange the old `switch` statements for the new guards created by the action creator <span data-file-link="../../lib/factory"><code>factory</code></span>.

This makes for more readable code, and we no longer need the <span data-file-link="./types/actionNames"><code>GuessingGameActionNames</code></span> type union.
*/

import { GuessingGameState } from './types'
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
