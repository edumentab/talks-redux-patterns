import React, { FunctionComponent, useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeStore, AppState } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'
import { AppAction } from '../redux'
import { Store } from 'redux'
import { rebrickableService } from '../services'

type AppProps = { version: string }

export const App: FunctionComponent<AppProps> = ({ version }) => {
  const store = useMemo(
    () => makeStore({ deps: { rebrickable: rebrickableService } }),
    []
  )
  return (
    <Provider store={store as Store<AppState, AppAction>}>
      <Main version={version} />
    </Provider>
  )
}
