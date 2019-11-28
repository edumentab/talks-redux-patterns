/* REFAC|EDITCOMMENT
Since the code for loading sets for a theme has been moved from the <span data-file-link="../../../../app/Theme.tsx"><code>Theme</code></span> component into a <span data-file-link="./setCurrentTheme">consequence of <code>setCurrentTheme</code></span>, that logic is now tested here instead of in <span data-file-link="../../../../app/Theme.test.tsx"><code>Theme.test</code></span>.
*/

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
