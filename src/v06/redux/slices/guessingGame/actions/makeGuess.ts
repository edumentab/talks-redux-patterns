import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = {
  guess: number
}

export type MakeGuessAction = Action<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>('MAKE_GUESS')
