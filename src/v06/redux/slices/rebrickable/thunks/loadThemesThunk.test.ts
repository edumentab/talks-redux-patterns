import { loadThemesThunk } from '.'

jest.mock('../../../../services/rebrickable', () => ({
  ...require.requireActual('../../../../services/rebrickable'),
  getThemesByParent: jest.fn()
}))

import {
  getThemesByParent,
  fixtureTheme
} from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { nextTick, rigAsyncMock, makeTestStore } from '../../../../testUtils'

describe('the loadThemesThunk creator', () => {
  it('handles happy path', async () => {
    const { dispatch } = makeTestStore()
    const { resolve } = rigAsyncMock(getThemesByParent)

    dispatch(loadThemesThunk())
    expect(dispatch).toHaveBeenCalledWith(loadThemesInit())
    expect(getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesSuccess(fakeData))
  })
  it('handles sad path', async () => {
    const { dispatch } = makeTestStore()
    const { reject } = rigAsyncMock(getThemesByParent)

    dispatch(loadThemesThunk())

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesError(error))
  })
})
