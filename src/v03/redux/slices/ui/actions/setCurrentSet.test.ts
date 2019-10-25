/* REFAC|EDITCOMMENT
Here as in <span data-file-link="./setCurrentTheme.test.ts">the <code>setCurrentTheme</code> tests</span> we get the benefit of co-location. Since the `setCurrentSet` action affects two different state slices, the old reducer tests never showed the full picture. By testing the actions instead we now see all consequences across all slices in a single place.
*/

import { makeStore } from '../../../makeStore'
import { setCurrentSet } from '.'
import { makeGuess } from '../../guessingGame/actions'

describe('the setCurrentSet action', () => {
  it('sets the current set and resets guesses', () => {
    const { getState, dispatch } = makeStore()
    dispatch(makeGuess(666))
    dispatch(setCurrentSet('6090'))
    expect(getState().ui.currentSetId).toEqual('6090')
    expect(getState().guessingGame.guesses).toEqual([])
  })
})
