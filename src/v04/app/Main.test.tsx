import React from 'react'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../redux'
import { Main } from './Main'
import { ById } from '../types'
import { testRender, makeTestStore, nextTick, rigAsyncMock } from '../testUtils'

jest.mock('../services/rebrickable')
import { getThemesByParent, fixtureTheme } from '../services/rebrickable'
import { Theme as ThemeType } from '../services/rebrickable/types'

jest.mock('./ThemeSelector', () => ({ ThemeSelector: jest.fn(() => null) }))
import { ThemeSelector } from './ThemeSelector'

jest.mock('./Theme', () => ({ Theme: jest.fn(() => null) }))
import { Theme } from './Theme'

describe('The Main component', () => {
  beforeEach(() => {
    rigAsyncMock(getThemesByParent)
  })
  it('renders ThemeSelector and Theme', () => {
    testRender(<Main version={'foo'} />, { store: makeTestStore() })

    expect(Theme).toHaveBeenCalled()
    expect(ThemeSelector).toHaveBeenCalled()
  })
  describe('on creation', () => {
    it('dispatches loadThemesInit, calls service, handles happy path', async () => {
      const { resolve } = rigAsyncMock(getThemesByParent)
      const store = makeTestStore()

      testRender(<Main version={'foo'} />, { store })

      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(loadThemesInit())
      expect(getThemesByParent).toHaveBeenCalledWith(186)

      const fakeResponse: ById<ThemeType> = {
        666: fixtureTheme
      }

      resolve(fakeResponse)
      await nextTick()

      expect(store.dispatch).toHaveBeenCalledTimes(2)
      expect(store.dispatch).toHaveBeenCalledWith(
        loadThemesSuccess({ data: fakeResponse })
      )
    })
    it('handles sad path', async () => {
      const { reject } = rigAsyncMock(getThemesByParent)

      const store = makeTestStore()

      testRender(<Main version={'foo'} />, { store })

      reject('oh no')
      await nextTick()

      expect(store.dispatch).toHaveBeenCalledWith(
        loadThemesError({ error: 'oh no' })
      )
    })
  })
})
