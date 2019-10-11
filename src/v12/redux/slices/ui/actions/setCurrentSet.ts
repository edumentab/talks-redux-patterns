import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'

type SetCurrentSetPayload = {
  setId: string
}

export type SetCurrentSetAction = AppActionMould<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = actionCreatorFactory<
  SetCurrentSetAction
>({
  type: 'SET_CURRENT_SET',
  reducer: (state, payload) => {
    const { setId } = payload
    return produce(state, draft => {
      draft.ui.currentSetId = setId
      draft.guessingGame.guesses = []
    })
  }
})
