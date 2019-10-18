import { AppThunkCreator } from '../../../../redux'
import { loadSetsInit, loadSetsSuccess, loadSetsError } from '../actions'

export const loadSetsForThemeThunk: AppThunkCreator<number> = (
  themeId: number
) => (dispatch, getState, deps) => {
  dispatch(loadSetsInit(themeId))
  deps.rebrickable
    .getSetsForTheme(themeId)
    .then(data => dispatch(loadSetsSuccess({ themeId, data })))
    .catch(error => dispatch(loadSetsError({ themeId, error })))
}
