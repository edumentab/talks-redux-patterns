import {
  LoadSetsErrorAction,
  LoadSetsInitAction,
  LoadSetsSuccessAction,
  LoadThemesErrorAction,
  LoadThemesInitAction,
  LoadThemesSuccessAction
} from '../slices/rebrickable/actions'

import { MakeGuessAction } from '../slices/guessingGame/actions'

import {
  SetCurrentSetAction,
  SetCurrentThemeAction
} from '../slices/ui/actions'

export type AppAction =
  | LoadSetsErrorAction
  | LoadSetsSuccessAction
  | LoadSetsInitAction
  | LoadThemesErrorAction
  | LoadThemesInitAction
  | LoadThemesSuccessAction
  | MakeGuessAction
  | SetCurrentSetAction
  | SetCurrentThemeAction
