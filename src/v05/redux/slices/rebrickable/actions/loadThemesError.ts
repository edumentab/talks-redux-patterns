import { RebrickableActionNames } from '../types/actionNames'
import { Action } from '../../../lib/types/action'
import { factory } from '../../../lib/factory'

type LoadThemesErrorPayload = string

export type LoadThemesErrorAction = Action<
  RebrickableActionNames.LOAD_THEMES_ERROR,
  LoadThemesErrorPayload
>

export const loadThemesError = factory<LoadThemesErrorAction>({
  type: RebrickableActionNames.LOAD_THEMES_ERROR,
  isError: true
})
