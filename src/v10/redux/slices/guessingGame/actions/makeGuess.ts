import { GuessingGameActionNames } from '../types/actionNames'
import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type MakeGuessPayload = {
  guess: number
}

export type MakeGuessAction = AppActionMould<
  GuessingGameActionNames.MAKE_GUESS,
  MakeGuessPayload
>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>({
  type: GuessingGameActionNames.MAKE_GUESS,
  reducer: (state, payload) => {
    const { guess } = payload
    return produce(state, draft => {
      draft.guessingGame.guesses.push(guess)
    })
  }
})
