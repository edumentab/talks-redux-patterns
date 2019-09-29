import { GuessingGameActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = {
  guess: number
}

export type MakeGuessAction = Action<
  GuessingGameActionNames.MAKE_GUESS,
  MakeGuessPayload
>

export const makeGuess = factory<MakeGuessAction>(
  GuessingGameActionNames.MAKE_GUESS
)
