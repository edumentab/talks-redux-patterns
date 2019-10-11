import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

type MakeGuessPayload = {
  guess: number
}

export type MakeGuessAction = AppActionMould<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = actionCreatorFactory<MakeGuessAction>({
  type: 'MAKE_GUESS',
  reducer: (state, payload) => {
    const { guess } = payload
    return produce(state, draft => {
      draft.guessingGame.guesses.push(guess)
    })
  }
})
