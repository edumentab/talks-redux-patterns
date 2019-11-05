import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = AppAction<
  'LOAD_THEMES_ERROR',
  LoadThemesErrorPayload
>

export const [loadThemesError, isLoadThemesError] = factory<
  LoadThemesErrorAction
>({ type: 'LOAD_THEMES_ERROR', isError: true })
