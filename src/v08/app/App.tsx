/* REFAC|EDITCOMMENT
Since we got rid of <span data-file-link="../redux/lib/types/thunk"><code>Thunks</code></span> our <span data-file-link="../redux/types/appStore"><code>AppStore</code></span> is again a valid Redux store, and we no longer need to cast the store given to use from <span data-file-link="../redux/makeStore"><code>makeProdStore</code></span>
*/

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
