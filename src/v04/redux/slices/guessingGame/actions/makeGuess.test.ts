import { makeStore } from '../../../makeStore'
import { makeGuess } from '.'

describe('the makeGuess action', () => {
  it('adds guesses correctly', () => {
    const { getState, dispatch } = makeStore()
    expect(getState().guessingGame.guesses).toEqual([])
    dispatch(makeGuess({ guess: 666 }))
    expect(getState().guessingGame.guesses).toEqual([666])
    dispatch(makeGuess({ guess: 777 }))
    expect(getState().guessingGame.guesses).toEqual([666, 777])
  })
})
