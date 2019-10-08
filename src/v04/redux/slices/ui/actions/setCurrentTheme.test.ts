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
