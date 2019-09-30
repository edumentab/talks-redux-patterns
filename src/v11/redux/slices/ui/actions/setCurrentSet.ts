import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type SetCurrentSetPayload = {
  setId: string
}

export type SetCurrentSetAction = AppActionMould<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>({
  type: 'SET_CURRENT_SET',
  reducer: (state, payload) => {
    const { setId } = payload
    return produce(state, draft => {
      draft.ui.currentSetId = setId
      draft.guessingGame.guesses = []
    })
  }
})
