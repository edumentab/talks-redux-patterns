import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { nextTick, makeTestStore, rigAsyncMock } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'
import {
  loadSetsError,
  loadSetsSuccess,
  loadSetsInit,
  isLoadSetsInit,
  loadThemesSuccess
} from '.'

const consGetter: AppConsGetter = ({ action }) =>
  isLoadSetsInit(action) ? [action.cons!] : []

const themeId = 666
const fakeThemeData = { [themeId]: fixtureTheme }

const deps = {
  rebrickable: {
    getSetsForTheme: jest.fn()
  }
}

describe('the loadSetsInit action consequence', () => {
  it('calls service, handles happy path', async () => {
    const { resolve } = rigAsyncMock(deps.rebrickable.getSetsForTheme)
    const { dispatch } = makeTestStore({ deps, consGetter })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))

    dispatch(loadSetsInit(themeId))

    expect(deps.rebrickable.getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)

    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadSetsSuccess({ data: fakeData, themeId }),
      sender: 'CONSEQUENCE(LOAD_SETS_INIT)'
    })
  })

  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

    const { dispatch } = makeTestStore({ deps, consGetter })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))

    dispatch(loadSetsInit(themeId))

    const error = 'KABLAM!!'
    reject(error)

    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadSetsError({ error, themeId }),
      sender: 'CONSEQUENCE(LOAD_SETS_INIT)'
    })
  })
})
