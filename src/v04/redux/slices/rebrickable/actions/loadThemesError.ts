import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = {
  error: string
}

export type LoadThemesErrorAction = Action<
  RebrickableActionNames.LOAD_THEMES_ERROR,
  LoadThemesErrorPayload
>

export const loadThemesError = factory<LoadThemesErrorAction>(
  RebrickableActionNames.LOAD_THEMES_ERROR,
  true
)
