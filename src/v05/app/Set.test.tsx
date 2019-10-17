import React from 'react'
import { testRender } from '../testUtils'
import { fixtureTheme, fixtureSet } from '../services/rebrickable'
import {
  makeStore,
  loadThemesSuccess,
  loadSetsSuccess,
  setCurrentTheme,
  setCurrentSet
} from '../redux'
import { Set } from './Set'

describe('the Set component', () => {
  it('shows the image of the current set', () => {
    const store = makeStore()
    const themeId = 123
    const setId = '6086'
    const setImageUrl = 'fake_image_url'
    store.dispatch(loadThemesSuccess({ data: { [themeId]: fixtureTheme } }))
    store.dispatch(
      loadSetsSuccess({
        themeId,
        data: {
          [setId]: {
            ...fixtureSet,
            set_img_url: setImageUrl
          }
        }
      })
    )
    store.dispatch(setCurrentTheme(themeId))
    store.dispatch(setCurrentSet(setId))

    const { getByTestId } = testRender(<Set />, { store })

    expect(getByTestId('setimg')).toHaveAttribute('src', setImageUrl)
  })
})
