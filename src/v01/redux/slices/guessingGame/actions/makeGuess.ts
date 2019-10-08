import { GuessingGameActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = Action<
  GuessingGameActionNames.MAKE_GUESS,
  MakeGuessPayload
>

export const makeGuess = (guess: number): MakeGuessAction => ({
  type: GuessingGameActionNames.MAKE_GUESS,
  payload: guess
})
