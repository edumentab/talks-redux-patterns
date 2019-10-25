/* REFAC|EDITCOMMENT
Since `makeGuess` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/

import { makeStore } from '../../../makeStore'
import { makeGuess } from '.'

describe('the makeGuess action', () => {
  it('adds guesses correctly', () => {
    const { getState, dispatch } = makeStore()
    expect(getState().guessingGame.guesses).toEqual([])
    dispatch(makeGuess(666))
    expect(getState().guessingGame.guesses).toEqual([666])
    dispatch(makeGuess(777))
    expect(getState().guessingGame.guesses).toEqual([666, 777])
  })
})
