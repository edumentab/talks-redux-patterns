import React from 'react'
jest.mock('../redux', () => ({
  ...jest.requireActual('../redux'),
  loadThemesThunk: jest.fn()
}))
import { loadThemesThunk } from '../redux'
import { Main } from './Main'
import { testRender, makeTestStore } from '../testUtils'

jest.mock('./ThemeSelector', () => ({ ThemeSelector: jest.fn(() => null) }))
import { ThemeSelector } from './ThemeSelector'

jest.mock('./Theme', () => ({ Theme: jest.fn(() => null) }))
import { Theme } from './Theme'

describe('The Main component', () => {
  const fakeThunk = { type: 'fakethunk' }
  beforeEach(() => {
    ;(loadThemesThunk as jest.Mock).mockReturnValue(fakeThunk)
  })
  it('renders ThemeSelector and Theme', () => {
    testRender(<Main version={'foo'} />, { store: makeTestStore() })

    expect(Theme).toHaveBeenCalled()
    expect(ThemeSelector).toHaveBeenCalled()
  })
  describe('on creation', () => {
    it('dispatches loadThemesThunk', () => {
      const store = makeTestStore()

      testRender(<Main version={'foo'} />, { store })

      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(fakeThunk)
    })
  })
})
