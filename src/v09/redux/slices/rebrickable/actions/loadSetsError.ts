import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = Action<
  'LOAD_SETS_ERROR',
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<LoadSetsErrorAction>(
  'LOAD_SETS_ERROR',
  true
)
