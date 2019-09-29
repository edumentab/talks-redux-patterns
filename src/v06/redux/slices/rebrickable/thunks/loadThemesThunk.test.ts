import { makeStore } from '../../../makeStore'
import { loadThemesThunk } from '.'

jest.mock('../../../../services', () => ({
  rebrickableService: {
    ...require.requireActual('../../../../services').rebrickableService,
    getThemesByParent: jest.fn()
  }
}))

import { rebrickableService } from '../../../../services'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { fakePromise, nextTick } from '../../../lib'

describe('the loadThemesThunk creator', () => {
  it('handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    ;(rebrickableService.getThemesByParent as any).mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog })
    dispatch(loadThemesThunk())
    expect(actionLog[actionLog.length - 1]).toEqual(loadThemesInit())
    expect(rebrickableService.getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: rebrickableService.fixtureTheme }
    resolve(fakeData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadThemesSuccess({ data: fakeData })
      )
    })
  })
  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    ;(rebrickableService.getThemesByParent as any).mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog })
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
