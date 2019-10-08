import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import {
  loadThemesSuccess,
  loadSetsInit,
  loadSetsSuccess
} from '../../rebrickable/actions'
import { setCurrentTheme, isSetCurrentTheme } from '.'
import { nextTick } from '../../../../utils'
import { AppConsGetter } from '../../../types'

const consGetter: AppConsGetter = ({ action }) =>
  isSetCurrentTheme(action) ? [action.cons!] : []

const themeId = 666
const fakeThemeData = { [themeId]: fixtureTheme }
const fakeSetData = { 777: fixtureSet }

describe('the loadThemesSuccess consequence', () => {
  it('dispatches loadSetsInit', async () => {
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, consGetter })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))

    dispatch(setCurrentTheme(themeId))

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).toMatchObject(
        loadSetsInit(themeId)
      )
    })
  })
  it('doesnt dispatch if we already have sets for that theme', async () => {
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, consGetter })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))
    dispatch(loadSetsSuccess({ data: fakeSetData, themeId }))

    dispatch(setCurrentTheme(themeId))

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).not.toMatchObject(
        loadSetsInit(themeId)
      )
    })
  })
  it('doesnt dispatch if we are already loading', async () => {
    const actionLog: any[] = []
    const { dispatch } = makeStore({ actionLog, consGetter })
    dispatch(loadThemesSuccess({ data: fakeThemeData }))
    dispatch(loadSetsInit(themeId))

    dispatch(setCurrentTheme(themeId))

    await nextTick(() => {
      expect(actionLog[actionLog.length - 1]).not.toMatchObject(
        loadSetsInit(themeId)
      )
    })
  })
})
