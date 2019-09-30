import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '.'
import { fakePromise, nextTick } from '../../../../utils'
import { AppConsGetter } from '../../../types'
import { isLoadThemesInit } from './loadThemesInit'

const consGetter: AppConsGetter = ({ action }) =>
  isLoadThemesInit(action) ? [action.cons!] : []

const deps = {
  rebrickable: {
    getThemesByParent: jest.fn()
  }
}

describe('the loadThemesInit consequence', () => {
  it('calls service, handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    deps.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps, consGetter })

    dispatch(loadThemesInit())

    expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toMatchObject(
        loadThemesSuccess({ data: fakeData })
      )
    })
  })
  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    deps.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, deps, consGetter })

    dispatch(loadThemesInit())

    const error = 'oh no'
    reject(error)

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toMatchObject(
        loadThemesError({ error })
      )
    })
  })
})
