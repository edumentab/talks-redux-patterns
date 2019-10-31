/* REFAC|EDITCOMMENT
Our <span data-file-link="../redux/types/appStore.ts"><code>AppStore</code></span> type now allows us to dispatch <span data-file-link="../redux/types/appThunk.ts"><code>AppThunk</code></span> as well as <span data-file-link="../redux/types/appAction.ts"><code>AppAction</code></span>. This is not a valid Redux Store, which is why we now have to do the ugly casting here (the same thing happens in <span data-file-link="../app/App.tsx"><code>App.tsx</code></span>).
*/

import React, { FunctionComponent } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { AppStore, AppAction } from '../redux'

/*
The exported `testRender` function is a wrapper around `render` from '@testing-library/react'.
In addition to the usual render options it takes a store, and will wrap the given UI with a
react-redux provider for that store. 

This is useful when testing components using the useDispatch/useSelector hooks.
*/

type TestRenderProps = RenderOptions & {
  store: AppStore
}

const TestProvider: FunctionComponent<{ store: AppStore }> = ({
  store,
  children
}) => <Provider store={store as Store<any, AppAction>}>{children}</Provider>

export function testRender(
  ui: Parameters<typeof render>[0],
  { store, ...otherOpts }: TestRenderProps
) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}
