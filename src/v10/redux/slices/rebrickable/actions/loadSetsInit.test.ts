import {
  loadSetsError,
  loadSetsInit,
  loadThemesSuccess,
  loadSetsInitConsequence,
  loadSetsSuccess
} from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { nextTick, makeTestStore, rigAsyncMock } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'

describe('the loadSetsInit action', () => {
  it('sets loading flag and clears earlier error', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsError(666, 'error we want to be cleared'))
    dispatch(loadSetsInit(666))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe(null)
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(true)
  })
  describe('the loadSetsInit action consequence', () => {
    const consGetter: AppConsGetter = () => [loadSetsInitConsequence]
    const themeId = 666
    const fakeThemeData = { [themeId]: fixtureTheme }
    const deps = {
      rebrickable: {
        getSetsForTheme: jest.fn()
      }
    }
    it('calls service, handles happy path', async () => {
      const { resolve } = rigAsyncMock(deps.rebrickable.getSetsForTheme)
      const { dispatch } = makeTestStore({ deps, consGetter })
      dispatch(loadThemesSuccess(fakeThemeData))

      dispatch(loadSetsInit(themeId))

      expect(deps.rebrickable.getSetsForTheme).toHaveBeenCalledWith(themeId)

      const fakeData = { 5: fixtureSet }
      resolve(fakeData)

      await nextTick()

      expect(dispatch).toHaveBeenCalledWith(loadSetsSuccess(themeId, fakeData))
    })

    it('handles sad path', async () => {
      const { reject } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

      const { dispatch } = makeTestStore({ deps, consGetter })
      dispatch(loadThemesSuccess(fakeThemeData))

      dispatch(loadSetsInit(themeId))

      const error = 'KABLAM!!'
      reject(error)

      await nextTick()

      expect(dispatch).toHaveBeenCalledWith(loadSetsError(themeId, error))
    })
  })
})
