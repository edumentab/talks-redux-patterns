/* REFAC|EDITCOMMENT
<span data-file-link="./Main"><code>Main</code></span> now uses the <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate the <span data-file-link="../redux/lib/types/action"><code>Action</code></span> with a `.sender` prop, so we have to accommodate for that here in the tests.

The same change was made in the tests for <span data-file-link="./Guess.test"><code>Guess</code></span>, <span data-file-link="./SetSelector.test"><code>SetSelector</code></span> and <span data-file-link="./ThemeSelector.test"><code>ThemeSelector</code></span>.
*/

import React from 'react'
import { loadThemesInit } from '../redux'
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
  describe('on creation', () => {
    it('dispatches loadThemesThunk', () => {
      const store = makeTestStore()

      testRender(<Main version={'foo'} />, { store })

      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith({
        ...loadThemesInit(),
        sender: 'VIEW(Main)'
      })
    })
  })
})
