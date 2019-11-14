/* REFAC|EDITCOMMENT
The responsibility of firing the <span data-file-link="../redux/slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> action has been moved from the <span data-file-link="./Main"><code>Main</code></span> component into <span data-file-link="../redux/makeStore"><code>makeProdStore</code></span>, so we no longer need to test for that here.
*/

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
