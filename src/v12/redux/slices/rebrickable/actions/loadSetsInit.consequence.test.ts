import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { fakePromise, nextTick } from '../../../../utils'
import { AppConsGetter } from '../../../types'
import {
  loadSetsError,
  loadSetsSuccess,
  loadSetsInit,
  isLoadSetsInit,
  loadThemesSuccess
} from '.'

const consequenceGetter: AppConsGetter = ({ action }) => {
  if (isLoadSetsInit(action)) {
    return Array.isArray(action.consequence)
      ? action.consequence
      : [action.consequence!]
  }

  return []
}

const themeId = 666
const fakeThemeData = { [themeId]: fixtureTheme }

const dependencies: any = {
  rebrickable: {
    getSetsForTheme: jest.fn()
  }
}

describe('the loadSetsInit action consequence', () => {
  it('calls service, handles happy path', async () => {
    const { promise, resolve } = fakePromise()
    dependencies.rebrickable.getSetsForTheme.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({
      actionLog,
      dependencies,
      consequenceGetter
    })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))

    dispatch(loadSetsInit({ themeId }))

    expect(dependencies.rebrickable.getSetsForTheme).toHaveBeenCalledWith(
      themeId
    )

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toMatchObject(
        loadSetsSuccess({ data: fakeData, themeId })
      )
    })
  })

  it('handles sad path', async () => {
    const { promise, reject } = fakePromise()
    dependencies.rebrickable.getSetsForTheme.mockReturnValue(promise)
    const actionLog: any[] = []
    const { dispatch } = makeStore({
      actionLog,
      dependencies,
      consequenceGetter
    })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))

    dispatch(loadSetsInit({ themeId }))

    const error = 'KABLAM!!'
    reject(error)

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toMatchObject(
        loadSetsError({ error, themeId })
      )
    })
  })
})
