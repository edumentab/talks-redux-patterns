import { fixtureTheme } from '../../../../services/rebrickable'
import {
  loadThemesInit,
  loadThemesSuccess,
  loadThemesError,
  loadThemesInitConsequence
} from '.'
import { nextTick, makeTestStore, rigAsyncMock } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'

const consGetter: AppConsGetter = () => [loadThemesInitConsequence]

const deps = {
  rebrickable: {
    getThemesByParent: jest.fn()
  }
}

describe('the loadThemesInit consequence', () => {
  it('calls service, handles happy path', async () => {
    const { resolve } = rigAsyncMock(deps.rebrickable.getThemesByParent)
    const { dispatch } = makeTestStore({ deps, consGetter })

    dispatch(loadThemesInit())

    expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesSuccess(fakeData))
  })
  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getThemesByParent)
    const { dispatch } = makeTestStore({ deps, consGetter })

    dispatch(loadThemesInit())

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesError({ error }))
  })
})
