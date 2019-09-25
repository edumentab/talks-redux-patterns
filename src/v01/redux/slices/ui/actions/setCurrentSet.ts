import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'

type SetCurrentSetPayload = {
  setId: string
}

export type SetCurrentSetAction = Action<
  UIActionNames.SET_CURRENT_SET,
  SetCurrentSetPayload
>

export const setCurrentSet = (setId: string): SetCurrentSetAction => ({
  type: UIActionNames.SET_CURRENT_SET,
  payload: { setId }
})
