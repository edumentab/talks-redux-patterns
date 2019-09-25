import { GuessingGameActionNames } from '../types/actionNames'
import { Action } from '../../../types/util'

type MakeGuessPayload = {
  guess: number
}

export type MakeGuessAction = Action<
  GuessingGameActionNames.MAKE_GUESS,
  MakeGuessPayload
>

export const makeGuess = (guess: number): MakeGuessAction => ({
  type: GuessingGameActionNames.MAKE_GUESS,
  payload: { guess }
})
