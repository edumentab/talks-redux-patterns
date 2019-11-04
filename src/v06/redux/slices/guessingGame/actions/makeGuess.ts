/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.
*/

import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = Action<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>({
  type: 'MAKE_GUESS'
})
