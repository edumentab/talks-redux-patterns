import { AppThunkCreator } from '../../../lib/types/thunk'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../actions'

export const loadThemesThunk: AppThunkCreator = () => (
  dispatch,
  getState,
  deps
) => {
  dispatch(loadThemesInit())
  deps.rebrickable
    .getThemesByParent(186)
    .then(data => dispatch(loadThemesSuccess({ data })))
    .catch(error => dispatch(loadThemesError({ error })))
}
