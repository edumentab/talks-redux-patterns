/* REFAC|EDITCOMMENT
Here we test our new <span data-file-link="./loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> <span data-file-link="../../../types/appThunk"><code>AppThunk</code></span>.

Since `loadSetsForThemeThunk` contains side effect logic extracted from the <span data-file-link="../../../../app/Theme"><code>Theme.tsx</code></span> component, we can see that the tests here largely correspond to what's been removed from the <span data-file-link="../../../../app/Theme.test"><code>Theme</code> tests</span>.
*/

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

describe('the loadSetsForThemeThunk creator', () => {
  let store: TestStore
  beforeEach(() => {
    rigAsyncMock(getSetsForTheme)
    store = makeTestStore()
    store.dispatch(
      loadThemesSuccess({
        [themeId]: fixtureTheme
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
      loadSetsSuccess(themeId, fakeData)
    )
  })
  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(loadSetsError(themeId, error))
  })
})
