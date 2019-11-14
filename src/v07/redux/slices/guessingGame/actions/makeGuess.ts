import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'

type MakeGuessPayload = number // Just need the actual guess, setnumber is in UI state

export type MakeGuessAction = AppAction<'MAKE_GUESS', MakeGuessPayload>

export const [makeGuess, isMakeGuess] = factory<MakeGuessAction>({
  type: 'MAKE_GUESS'
})
