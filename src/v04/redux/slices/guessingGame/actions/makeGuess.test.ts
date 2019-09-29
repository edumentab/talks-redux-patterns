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
