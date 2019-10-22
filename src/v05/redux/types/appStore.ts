/* REFAC|EDITCOMMENT
Because we can now dispatch thunks as well as actions, we must change the signature of our store's `.dispatch` method. This also means that our store is no longer assignable to the basic Redux `Store` type, forcing us to do some ugly type casting elsewhere.
*/

import { AppAction } from './appAction'
import { AppThunk } from './appThunk'
import { AppState } from './appState'

export type AppStore = {
  getState: () => AppState
  dispatch: (a: AppAction | AppThunk) => void
}
