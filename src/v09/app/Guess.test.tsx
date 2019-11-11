/* REFAC|EDITCOMMENT
<span data-file-link="./Guess"><code>Guess</code></span> now uses the <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate the <span data-file-link="../redux/lib/types/action"><code>Action</code></span> with a `.sender` prop, so we have to accommodate for that here in the tests.

The same change was made in the tests for <span data-file-link="./Main.test"><code>Main</code></span>, <span data-file-link="./SetSelector.test"><code>SetSelector</code></span> and <span data-file-link="./ThemeSelector.test"><code>ThemeSelector</code></span>.
*/

import React from 'react'
import { testRender, makeTestStore } from '../testUtils'
import { fireEvent } from '@testing-library/react'
import { fixtureTheme, fixtureSet } from '../services/rebrickable'
import {
  loadThemesSuccess,
  loadSetsSuccess,
  setCurrentTheme,
  setCurrentSet,
  makeGuess
} from '../redux'
import { Guess } from './Guess'

describe('the Guess component', () => {
  it('renders the current guesses and adds new guesses', async () => {
    const store = makeTestStore()
    const themeId = 123
    const setId = '6086'
    const partCount = 50
    store.dispatch(loadThemesSuccess({ [themeId]: fixtureTheme }))
    store.dispatch(
      loadSetsSuccess(themeId, {
        [setId]: {
          ...fixtureSet,
          num_parts: partCount
        }
      })
    )
    store.dispatch(setCurrentTheme(themeId))
    store.dispatch(setCurrentSet(setId))
    store.dispatch(makeGuess(40))

    const { getByTestId } = testRender(<Guess />, { store })

    expect(getByTestId('guesslist')).toHaveTextContent('40 - low')

    fireEvent.change(getByTestId('guessinput'), { target: { value: 60 } })
    fireEvent.submit(getByTestId('guessform'))

    expect(store.dispatch).toHaveBeenCalledWith({
      ...makeGuess(60),
      sender: 'VIEW(Guess)'
    })
    expect(getByTestId('guesslist')).toHaveTextContent('60 - high')
  })
})
