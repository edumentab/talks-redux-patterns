import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import {
  loadThemesSuccess,
  loadSetsInit,
  loadSetsSuccess
} from '../../rebrickable/actions'
import { setCurrentTheme, isSetCurrentTheme } from '.'
import { makeTestStore, nextTick } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'
import { makeGuess } from '../../guessingGame/actions'
import { makeStore } from '../../../makeStore'

describe('the setCurrentTheme action', () => {
  it('sets the current theme and resets guesses', () => {
    const { getState, dispatch } = makeStore()
    dispatch(makeGuess(666))
    dispatch(setCurrentTheme(198))
    expect(getState().ui.currentThemeId).toEqual(198)
    expect(getState().guessingGame.guesses).toEqual([])
  })
  describe('the setCurrentTheme consequence', () => {
    const consGetter: AppConsGetter = ({ action }) =>
      isSetCurrentTheme(action) ? [action.cons!] : []

    const themeId = 666
    const fakeThemeData = { [themeId]: fixtureTheme }
    const fakeSetData = { 777: fixtureSet }
    const loadThemesAction = {
      ...loadSetsInit(themeId),
      sender: 'CONSEQUENCE(SET_CURRENT_THEME)'
    }
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
      dispatch(loadSetsSuccess(themeId, fakeSetData))

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
})
