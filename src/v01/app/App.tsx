import React, { FunctionComponent } from 'react'

import { Provider } from 'react-redux'
import { makeStore } from '../redux'

const store = makeStore({})

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'

type AppProps = { version: string }

export const App: FunctionComponent<AppProps> = ({ version }) => (
  <Provider store={store}>
    <Main version={version} />
  </Provider>
)
