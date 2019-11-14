/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a `reducer`, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>guessingGameReducer</code></span>.

Note how we don't have to change the <span data-file-link="./makeGuess.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/guessingGame/actions/makeGuess.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = AppAction<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>({
  type: 'MAKE_GUESS',
  reducer: (state, payload) =>
    produce(state, draft => {
      draft.guessingGame.guesses.push(payload)
    })
})
