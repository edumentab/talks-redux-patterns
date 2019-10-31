/* REFAC|EDITCOMMENT
Because we can now dispatch <span data-file-link="./appThunk.ts"><code>AppThunk</code></span> as well as <span data-file-link="./appAction.ts"><code>AppAction</code></span>, we must change the signature of our store's `.dispatch` method.

This also means that what we return from <span data-file-link="../makeStore.ts"><code>makeStore</code></span> is no longer assignable to the basic Redux `Store` type, forcing us to do some ugly type casting elsewhere (this happens in <span data-file-link="../../app/App.tsx"><code>App.tsx</code></span> and <span data-file-link="../../testUtils/testRender"><code>testRender</code></span>).
*/

import { AppAction } from './appAction'
import { AppThunk } from './appThunk'
import { AppState } from './appState'

export type AppStore = {
  getState: () => AppState
  dispatch: (a: AppAction | AppThunk) => void
}
