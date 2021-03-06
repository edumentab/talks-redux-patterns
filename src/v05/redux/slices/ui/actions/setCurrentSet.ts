import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types/actionNames'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = Action<
  UIActionNames.SET_CURRENT_SET,
  SetCurrentSetPayload
>

export const setCurrentSet = factory<SetCurrentSetAction>({
  type: UIActionNames.SET_CURRENT_SET
})
