import { AppCons } from '../../../types'
import { loadThemesSuccess } from './loadThemesSuccess'
import { loadThemesError } from './loadThemesError'
import { isLoadThemesInit } from './loadThemesInit'

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
