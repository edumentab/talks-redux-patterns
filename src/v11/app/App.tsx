import React, { FunctionComponent, useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeProdStore } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'

type AppProps = { version: string }

export const App: FunctionComponent<AppProps> = ({ version }) => {
  const store = useMemo(makeProdStore, [])
  return (
    <Provider store={store}>
      <Main version={version} />
    </Provider>
  )
}

export default App
