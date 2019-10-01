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

const deps = {
  rebrickable: {
    getSetsForTheme: jest.fn()
  }
}

const themeId = 666

const themeSuccessAction = loadThemesSuccess({
  data: { [themeId]: fixtureTheme }
})

describe('the loadSetsForThemeThunk creator', () => {
  it('calls service, handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    deps.rebrickable.getSetsForTheme.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps })
    dispatch(themeSuccessAction)

    dispatch(loadSetsForThemeThunk(themeId))

    expect(actionLog[actionLog.length - 1]).toEqual(loadSetsInit({ themeId }))
    expect(deps.rebrickable.getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeSetData = { 5: fixtureSet }
    resolve(fakeSetData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toEqual(
        loadSetsSuccess({ data: fakeSetData, themeId })
      )
    })
  })
  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    deps.rebrickable.getSetsForTheme.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps })
    dispatch(themeSuccessAction)

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
