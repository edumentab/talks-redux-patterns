import { AppCons } from '../../../types'
import { loadSetsSuccess } from './loadSetsSuccess'
import { loadSetsError } from './loadSetsError'
import { isLoadSetsInit } from './loadSetsInit'

export const loadSetsInitConsequence: AppCons = ({
  action,
  dispatch,
  deps
}) => {
  if (isLoadSetsInit(action)) {
    const themeId = action.payload
    deps.rebrickable
      .getSetsForTheme(themeId)
      .then(data => dispatch(loadSetsSuccess({ themeId, data })))
      .catch(error => dispatch(loadSetsError({ themeId, error })))
  }
}
