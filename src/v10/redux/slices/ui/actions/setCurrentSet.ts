/* REFAC|EDITCOMMENT
The <span data-file-link="../../../lib/factory">factory</span> now expects us to pass in a <span data-file-link="../../../lib/types/reducer"><code>Reducer</code></span>, so we move the corresponding code to here from the now-deleted <span data-file-link="../reducer"><code>uiReducer</code></span> and <span data-file-link="../../guessingGame/reducer"><code>guessingGameReducer</code></span> (since `setCurrentSet` affects both slices).

Note how we don't have to change the <span data-file-link="./setCurrentSet.test">tests</span> because of the refactor we made in <span data-file-link="v03/redux/slices/ui/actions/setCurrentSet.test">version 3</span>.

We make the same change in every single action creator throughout the app.
*/

import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = AppAction<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>({
  type: 'SET_CURRENT_SET',
  reducer: (state, payload) => {
    return produce(state, draft => {
      draft.ui.currentSetId = payload
      draft.guessingGame.guesses = []
    })
  }
})
