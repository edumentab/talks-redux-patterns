/* REFAC|EDITCOMMENT
Our <span data-file-link="../redux/types/appStore.ts"><code>AppStore</code></span> type now allows us to dispatch <span data-file-link="../redux/types/appThunk.ts"><code>AppThunk</code></span> as well as <span data-file-link="../redux/types/appAction.ts"><code>AppAction</code></span>. This is not a valid Redux Store, which is why we now have to do the ugly casting here (the same thing happens in <span data-file-link="../testUtils/testRender"><code>TestRender</code></span>).
*/

import React, { FunctionComponent, useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeStore, AppState } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'
import { AppAction } from '../redux'
import { Store } from 'redux'

type AppProps = { version: string }

export const App: FunctionComponent<AppProps> = ({ version }) => {
  const store = useMemo(() => makeStore(), [])
  return (
    <Provider store={store as Store<AppState, AppAction>}>
      <Main version={version} />
    </Provider>
  )
}
