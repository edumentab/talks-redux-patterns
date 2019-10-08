import { makeStore } from '../../../makeStore'
import { setCurrentSet } from '.'
import { makeGuess } from '../../guessingGame/actions'

describe('the setCurrentSet action', () => {
  it('sets the current set and resets guesses', () => {
    const { getState, dispatch } = makeStore()
    dispatch(makeGuess(666))
    dispatch(setCurrentSet({ setId: '6090' }))
    expect(getState().ui.currentSetId).toEqual('6090')
    expect(getState().guessingGame.guesses).toEqual([])
  })
})
