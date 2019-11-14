import { AppAction } from '../../../types'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = AppAction<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({ type: 'LOAD_THEMES_ERROR', isError: true })
