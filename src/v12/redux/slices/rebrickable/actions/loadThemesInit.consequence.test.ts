import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'
import {
  loadThemesInit,
  loadThemesSuccess,
  loadThemesError,
  isLoadThemesInit
} from '.'
import { fakePromise, nextTick } from '../../../../utils'
import { AppConsGetter } from '../../../types'

const consequenceGetter: AppConsGetter = ({ action }) => {
  if (isLoadThemesInit(action)) {
    return Array.isArray(action.consequence)
      ? action.consequence
      : [action.consequence!]
  }

  return []
}

const dependencies: any = {
  rebrickable: {
    getThemesByParent: jest.fn()
  }
}

describe('the loadThemesInit consequence', () => {
  it('calls service, handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    dependencies.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({
      actionLog,
      dependencies,
      consequenceGetter
    })

    dispatch(loadThemesInit())

    expect(dependencies.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

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
    dependencies.rebrickable.getThemesByParent.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({
      actionLog,
      dependencies,
      consequenceGetter
    })

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
