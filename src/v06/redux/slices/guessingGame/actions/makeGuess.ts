/* REFAC|EDITCOMMENT
As in all action creator setups we must adapt to the new signature of the <span data-file-link="../../../lib/factory"><code>factory</code></span>, which now returns both a creator and a guard.

We also switch to use <span data-file-link="../../../types/appAction"><code>AppAction</code></span> instead of <span data-file-link="../../../lib/types/action"><code>Action</code></span>, since the former will now serve as a facade for the latter.
*/

import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = AppAction<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>({
  type: 'MAKE_GUESS'
})
