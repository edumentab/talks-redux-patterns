import React, { FunctionComponent } from 'react'

import { Provider } from 'react-redux'
import { makeStore } from '../redux'

const store = makeStore({})

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)
