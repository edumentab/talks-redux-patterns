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
    store.dispatch(loadThemesSuccess({ data: { [themeId]: fixtureTheme } }))
    store.dispatch(
      loadSetsSuccess({
        themeId,
        data: {
          [setId]: {
            ...fixtureSet,
            num_parts: partCount
          }
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

    expect(store.dispatch).toHaveBeenCalledWith(makeGuess(60))
    expect(getByTestId('guesslist')).toHaveTextContent('60 - high')
  })
})
