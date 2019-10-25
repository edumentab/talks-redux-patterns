/* REFAC|EDITCOMMENT
Here as in <span data-file-link="./setCurrentSet.test.ts">the <code>setCurrentSet</code> tests</span> we get the benefit of co-location. Since the `setCurrentTheme` action affects two different state slices, the old reducer tests never showed the full picture. By testing the actions instead we now see all consequences across all slices in a single place.
*/

import { setCurrentTheme } from '.'
import { makeGuess } from '../../guessingGame/actions'
import { makeStore } from '../../../makeStore'

describe('the setCurrentTheme action', () => {
  it('sets the current theme and resets guesses', () => {
    const { getState, dispatch } = makeStore()
    dispatch(makeGuess(666))
    dispatch(setCurrentTheme(198))
    expect(getState().ui.currentThemeId).toEqual(198)
    expect(getState().guessingGame.guesses).toEqual([])
  })
})
