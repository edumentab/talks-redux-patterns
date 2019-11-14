import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = AppAction<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>({
  type: 'SET_CURRENT_SET',
  reducer: (state, payload) => {
    return produce(state, draft => {
      draft.ui.currentSetId = payload
      draft.guessingGame.guesses = []
    })
  }
})
