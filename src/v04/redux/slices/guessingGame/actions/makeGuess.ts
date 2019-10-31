/* REFAC|EDITCOMMENT
Like with all action creators, we refactor `makeGuess` to use the new <span data-file-link="../../../lib/factory.ts"><code>factory</code></span>.
*/

import { GuessingGameActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = Action<
  GuessingGameActionNames.MAKE_GUESS,
  MakeGuessPayload
>

export const makeGuess = factory<MakeGuessAction>({
  type: GuessingGameActionNames.MAKE_GUESS
})
