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
        data: { [themeId]: fixtureTheme }
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
      loadSetsSuccess({ data: fakeData, themeId })
    )
  })
  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

    store.dispatch(loadSetsForThemeThunk(themeId))

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
      loadSetsError({ themeId, error })
    )
  })
})
