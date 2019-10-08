import { AppThunkCreator } from '../../../lib/types/thunk'
import { rebrickableService } from '../../../../services'
import { loadSetsInit, loadSetsSuccess, loadSetsError } from '../actions'

export const loadSetsForThemeThunk: AppThunkCreator<number> = (
  themeId: number
) => dispatch => {
  dispatch(loadSetsInit(themeId))
  rebrickableService
    .getSetsForTheme(themeId)
    .then(data => dispatch(loadSetsSuccess({ themeId, data })))
    .catch(error => dispatch(loadSetsError({ themeId, error })))
}
