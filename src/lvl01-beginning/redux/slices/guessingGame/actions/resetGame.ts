import { GuessingGameActionNames } from '../types/actionNames'
import { Action } from '../../../types/util'

type ResetGamePayload = {
  maxGuesses: number
}

export type ResetGameAction = Action<
  GuessingGameActionNames.RESET_GAME,
  ResetGamePayload
>

export const resetGame = (maxGuesses?: number): ResetGameAction => ({
  type: GuessingGameActionNames.RESET_GAME,
  payload: { maxGuesses: maxGuesses || 5 }
})
