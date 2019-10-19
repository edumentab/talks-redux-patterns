import React from 'react'
import { Main } from './Main'
import { testRender, makeTestStore } from '../testUtils'

jest.mock('./ThemeSelector', () => ({ ThemeSelector: jest.fn(() => null) }))
import { ThemeSelector } from './ThemeSelector'

jest.mock('./Theme', () => ({ Theme: jest.fn(() => null) }))
import { Theme } from './Theme'

describe('The Main component', () => {
  it('renders ThemeSelector and Theme', () => {
    testRender(<Main version={'foo'} />, { store: makeTestStore() })

    expect(Theme).toHaveBeenCalled()
    expect(ThemeSelector).toHaveBeenCalled()
  })
})
