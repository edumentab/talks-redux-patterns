import { makeStore } from '../../../makeStore'
import { loadSetsForThemeThunk } from '.'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import {
  loadSetsInit,
  loadSetsError,
  loadSetsSuccess,
  loadThemesSuccess
} from '../actions'
import { fakePromise, nextTick } from '../../../../utils'

describe('the loadSetsForThemeThunk creator', () => {
  it('handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    const mockGetSetsForTheme = jest.fn().mockReturnValue(promise)
    const fakeDeps = {
      rebrickable: {
        getSetsForTheme: mockGetSetsForTheme
      }
    }
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps: fakeDeps })
    const themeId = 666
    dispatch(
      loadThemesSuccess({
        data: { [themeId]: fixtureTheme }
      })
    )

    dispatch(loadSetsForThemeThunk(themeId))
    expect(actionLog[actionLog.length - 1]).toEqual(loadSetsInit({ themeId }))
    expect(mockGetSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadSetsSuccess({ data: fakeData, themeId })
      )
    })
  })
  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    const mockGetSetsForTheme = jest.fn().mockReturnValue(promise)
    const fakeDeps = {
      rebrickable: {
        getSetsForTheme: mockGetSetsForTheme
      }
    }
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps: fakeDeps })
    const themeId = 666
    dispatch(
      loadThemesSuccess({
        data: { [themeId]: fixtureTheme }
      })
    )
    dispatch(loadSetsForThemeThunk(themeId))

    const error = 'oh no'
    reject(error)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadSetsError({ themeId, error })
      )
    })
  })
})
