import { makeStore } from '../../../makeStore'
import { loadSetsForThemeThunk } from '.'

jest.mock('../../../../services', () => ({
  rebrickableService: {
    ...require.requireActual('../../../../services').rebrickableService,
    getSetsForTheme: jest.fn()
  }
}))

import { rebrickableService } from '../../../../services'
import {
  loadSetsInit,
  loadSetsError,
  loadSetsSuccess,
  loadThemesSuccess
} from '../actions'
import { fakePromise, nextTick } from '../../../../utils'

describe('the loadSetsForThemeThunk creator', () => {
  it('handles happy path', async () => {
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog })
    const themeId = 666
    dispatch(
      loadThemesSuccess({
        data: { [themeId]: rebrickableService.fixtureTheme }
      })
    )

    const { promise, resolve } = fakePromise()
    ;(rebrickableService.getSetsForTheme as any).mockReturnValue(promise)

    dispatch(loadSetsForThemeThunk(themeId))
    expect(actionLog[actionLog.length - 1]).toEqual(loadSetsInit({ themeId }))
    expect(rebrickableService.getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: rebrickableService.fixtureSet }
    resolve(fakeData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadSetsSuccess({ data: fakeData, themeId })
      )
    })
  })
  it('handles sad path', async () => {
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog })
    const themeId = 666
    dispatch(
      loadThemesSuccess({
        data: { [themeId]: rebrickableService.fixtureTheme }
      })
    )

    const { promise, reject } = fakePromise()
    ;(rebrickableService.getSetsForTheme as any).mockReturnValue(promise)
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
