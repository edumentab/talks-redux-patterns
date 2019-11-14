import { guessingGameReducer } from './reducer'
import { makeGuess } from './actions'
import { GuessingGameState } from './types/state'
import { setCurrentSet, setCurrentTheme } from '../ui/actions'
import { initialGuessingGameState } from './initialState'

describe('The guessingGame reducer', () => {
  const startState: GuessingGameState = {
    ...initialGuessingGameState,
    guesses: [666]
  }
  it('adds guesses from makeGuess', () => {
    const action = makeGuess(777)
    const result = guessingGameReducer(startState, action)
    expect(result.guesses).toEqual([666, 777])
  })

  it('resets guesses for setCurrentSet actions', () => {
    const action = setCurrentSet('6037_2')
    const result = guessingGameReducer(startState, action)
    expect(result.guesses).toEqual([])
  })

  it('resets guesses for setCurrentTheme actions', () => {
    const action = setCurrentTheme(188)
    const result = guessingGameReducer(startState, action)
    expect(result.guesses).toEqual([])
  })
})
