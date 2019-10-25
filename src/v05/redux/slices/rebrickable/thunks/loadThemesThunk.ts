import { AppThunkCreator } from '../../../../redux'
import { rebrickableService } from '../../../../services'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../actions'

export const loadThemesThunk: AppThunkCreator = () => dispatch => {
  dispatch(loadThemesInit())
  rebrickableService
    .getThemesByParent(186)
    .then(data => dispatch(loadThemesSuccess(data)))
    .catch(error => dispatch(loadThemesError({ error })))
}
