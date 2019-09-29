import { makeStore } from '../../../makeStore'
import { loadThemesThunk } from '.'
import { fixtureTheme } from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { fakePromise, nextTick } from '../../../../utils'

describe('the loadThemesThunk creator', () => {
  it('handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    const mockGetThemesByParent = jest.fn().mockReturnValue(promise)
    const fakeDeps = {
      rebrickable: {
        getThemesByParent: mockGetThemesByParent
      }
    }
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps: fakeDeps })
    dispatch(loadThemesThunk())
    expect(actionLog[actionLog.length - 1]).toEqual(loadThemesInit())
    expect(mockGetThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadThemesSuccess({ data: fakeData })
      )
    })
  })
  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    const mockGetThemesByParent = jest.fn().mockReturnValue(promise)
    const fakeDeps = {
      rebrickable: {
        getThemesByParent: mockGetThemesByParent
      }
    }
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps: fakeDeps })
    dispatch(loadThemesThunk())

    const error = 'oh no'
    reject(error)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadThemesError({ error })
      )
    })
  })
})
