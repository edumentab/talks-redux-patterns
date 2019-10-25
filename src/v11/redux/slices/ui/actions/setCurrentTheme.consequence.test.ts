import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import {
  loadThemesSuccess,
  loadSetsInit,
  loadSetsSuccess
} from '../../rebrickable/actions'
import { setCurrentTheme, isSetCurrentTheme } from '.'
import { makeTestStore, nextTick } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'

const consGetter: AppConsGetter = ({ action }) =>
  isSetCurrentTheme(action) ? [action.cons!] : []

const themeId = 666
const fakeThemeData = { [themeId]: fixtureTheme }
const fakeSetData = { 777: fixtureSet }
const loadThemesAction = {
  ...loadSetsInit(themeId),
  sender: 'CONSEQUENCE(SET_CURRENT_THEME)'
}

describe('the loadThemesSuccess consequence', () => {
  it('dispatches loadSetsInit', async () => {
    const { dispatch } = makeTestStore({ consGetter })
    dispatch(loadThemesSuccess(fakeThemeData))

    dispatch(setCurrentTheme(themeId))

    await nextTick()
    expect(dispatch).toHaveBeenCalledWith(loadThemesAction)
  })
  it('doesnt dispatch if we already have sets for that theme', async () => {
    const { dispatch } = makeTestStore({ consGetter })
    dispatch(loadThemesSuccess(fakeThemeData))
    dispatch(loadSetsSuccess({ data: fakeSetData, themeId }))

    dispatch(setCurrentTheme(themeId))

    await nextTick()
    expect(dispatch).not.toHaveBeenCalledWith(loadThemesAction)
  })
  it('doesnt dispatch if we are already loading', async () => {
    const { dispatch } = makeTestStore({ consGetter })
    dispatch(loadThemesSuccess(fakeThemeData))
    dispatch(loadSetsInit(themeId))

    dispatch(setCurrentTheme(themeId))

    await nextTick()
    expect(dispatch).not.toHaveBeenCalledWith(loadThemesAction)
  })
})
