import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'

type LoadSetsErrorPayload = {
  themeId: number
  error: string
}

export type LoadSetsErrorAction = AppAction<
  'LOAD_SETS_ERROR',
  LoadSetsErrorPayload
>

export const [loadSetsError, isLoadSetsError] = factory<
  LoadSetsErrorAction,
  [number, string]
>({
  type: 'LOAD_SETS_ERROR',
  isError: true,
  mapper: (themeId: number, error: string) => ({ themeId, error })
})
