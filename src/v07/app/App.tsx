/* REFAC|EDITCOMMENT
We switch over to use the new <span data-file-link="../redux/makeStore"><code>makeProdStore</code></span> function which will provide the needed <span data-file-link="../redux/types/appDeps">AppDeps</span> for us.

These will then be consumed by our <span data-file-link="../redux/types/appThunk">AppThunks</span> (<span data-file-link="../redux/slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span> and <span data-file-link="../redux/slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>).
*/

import React, { FunctionComponent, useMemo } from 'react'

import { Provider } from 'react-redux'
import { makeProdStore, AppState } from '../redux'

import { Main } from './Main'

import '@blueprintjs/core/lib/css/blueprint.css'
import './App.css'
import { AppAction } from '../redux'
import { Store } from 'redux'

type AppProps = { version: string }

export const App: FunctionComponent<AppProps> = ({ version }) => {
  const store = useMemo(() => makeProdStore(), [])
  return (
    <Provider store={store as Store<AppState, AppAction>}>
      <Main version={version} />
    </Provider>
  )
}
