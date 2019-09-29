import { AppThunkCreator } from '../../../lib/types/thunk'
import { rebrickableService } from '../../../../services'
import { loadThemesInit, loadThemesError, loadThemesSuccess } from '../actions'

export const loadThemesThunk: AppThunkCreator = () => dispatch => {
  console.log('WTF', dispatch)
  dispatch(loadThemesInit())
  rebrickableService
    .getThemesByParent(186)
    .then(data => dispatch(loadThemesSuccess({ data })))
    .catch(error => dispatch(loadThemesError({ error })))
}
