import { makeStore } from '../../../makeStore'
import { loadThemesThunk } from '.'
import { fixtureTheme } from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { fakePromise, nextTick } from '../../../../utils'

const deps = {
  rebrickable: {
    getThemesByParent: jest.fn()
  }
}

describe('the loadThemesThunk creator', () => {
  it('handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    deps.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps })

    dispatch(loadThemesThunk())

    expect(actionLog[actionLog.length - 1]).toEqual(loadThemesInit())
    expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

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
    deps.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps })

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
