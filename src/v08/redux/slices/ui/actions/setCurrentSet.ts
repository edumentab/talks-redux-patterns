import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'

type SetCurrentSetPayload = string // SetId looks like for example "6080_2"

export type SetCurrentSetAction = AppAction<
  'SET_CURRENT_SET',
  SetCurrentSetPayload
>

export const [setCurrentSet, isSetCurrentSet] = factory<SetCurrentSetAction>({
  type: 'SET_CURRENT_SET'
})
