import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = Action<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>('MAKE_GUESS')
