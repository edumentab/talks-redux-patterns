import {
  LoadSetsErrorAction,
  LoadSetsInitAction,
  LoadSetsSuccessAction,
  LoadThemesErrorAction,
  LoadThemesInitAction,
  LoadThemesSuccessAction
} from '../slices/rebrickable/actions'

import {
  MakeGuessAction,
  ResetGameAction
} from '../slices/guessingGame/actions'

export type AppAction =
  | LoadSetsErrorAction
  | LoadSetsSuccessAction
  | LoadSetsInitAction
  | LoadThemesErrorAction
  | LoadThemesInitAction
  | LoadThemesSuccessAction
  | MakeGuessAction
  | ResetGameAction
