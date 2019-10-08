import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = Action<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>(
  'SET_CURRENT_SET'
)
