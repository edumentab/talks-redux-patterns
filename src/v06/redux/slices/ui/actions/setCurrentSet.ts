import { Action } from '../../../lib/types/action'
import { UIActionNames } from '../types'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = {
  setId: string
}

export type SetCurrentSetAction = Action<
  UIActionNames.SET_CURRENT_SET,
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>(
  UIActionNames.SET_CURRENT_SET
)
