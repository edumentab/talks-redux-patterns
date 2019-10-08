import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = Action<
  UIActionNames.SET_CURRENT_SET,
  SetCurrentSetPayload
>

export const setCurrentSet = factory<SetCurrentSetAction>(
  UIActionNames.SET_CURRENT_SET
)
