import { AppAction, AppCons } from '../../../types'
import { factory } from '../../../lib/factory'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'

export type LoadThemesInitAction = AppAction<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  {
    type: 'LOAD_THEMES_INIT'
  }
)

export const loadThemesInitConsequence: AppCons = ({
  action,
  dispatch,
  deps
}) => {
  if (isLoadThemesInit(action)) {
    deps.rebrickable
      .getThemesByParent(186)
      .then(data => dispatch(loadThemesSuccess(data)))
      .catch(err => dispatch(loadThemesError(err)))
  }
}
