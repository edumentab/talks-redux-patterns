/* REFAC|EDITCOMMENT
Since <span data-file-link="./loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> now gets the <span data-file-link="../../../types/appDeps"><code>AppDeps</code></span> from <span data-file-link="../../../makeStore"><code>makeStore</code></span> via the <span data-file-link="../../../lib/thunk"><code>thunk</code></span> middleware, we can now pass in our mocks directly instead of mocking imports.

The same thing applies to <span data-file-link="./loadThemesThunk.test">testing</span> the <span data-file-link="./loadThemesThunk"><code>loadThemesThunk</code></span>.
*/

import { loadSetsForThemeThunk } from '.'
import { AppDeps } from '../../../types'

import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
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
  let deps: AppDeps
  beforeEach(() => {
    deps = {
      rebrickable: ({
        getSetsForTheme: jest.fn()
      } as unknown) as AppDeps['rebrickable']
    }
    store = makeTestStore({ deps })
    store.dispatch(
      loadThemesSuccess({
        [themeId]: fixtureTheme
      })
    )
  })
  it('handles happy path', async () => {
    const { resolve } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(loadSetsInit(themeId))
    expect(deps.rebrickable.getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)

    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
      loadSetsSuccess(themeId, fakeData)
    )
  })
  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(loadSetsError(themeId, error))
  })
})
