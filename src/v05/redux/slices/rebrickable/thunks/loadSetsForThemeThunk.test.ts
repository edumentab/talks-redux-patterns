import { loadSetsForThemeThunk } from '.'

jest.mock('../../../../services/rebrickable', () => ({
  ...jest.requireActual('../../../../services/rebrickable'),
  getSetsForTheme: jest.fn()
}))

import {
  getSetsForTheme,
  fixtureTheme,
  fixtureSet
} from '../../../../services/rebrickable'
import {
  loadSetsInit,
  loadSetsError,
  loadSetsSuccess,
  loadThemesSuccess
} from '../actions'
import {
  rigAsyncMock,
  nextTick,
  makeTestStore,
  TestStore
} from '../../../../testUtils'

const themeId = 666

const themeSuccessAction = loadThemesSuccess({
  data: { [themeId]: fixtureTheme }
})

describe('the loadSetsForThemeThunk creator', () => {
  let store: TestStore
  beforeEach(() => {
    rigAsyncMock(getSetsForTheme)
    store = makeTestStore()
    store.dispatch(
      loadThemesSuccess({
        data: { [themeId]: fixtureTheme }
      })
    )
  })
  it('handles happy path', async () => {
    const { resolve } = rigAsyncMock(getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(loadSetsInit(themeId))
    expect(getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)

    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
      loadSetsSuccess({ data: fakeData, themeId })
    )
  })
  it('handles sad path', async () => {
    store.dispatch(themeSuccessAction)

    const { reject } = rigAsyncMock(getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
      loadSetsError({ themeId, error })
    )
  })
})
