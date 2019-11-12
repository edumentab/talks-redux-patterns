/* REFAC|EDITCOMMENT
We no longer use slice reducers. Instead the <span data-file-link="./lib/factory">factory</span> will make every <span data-file-link="./lib/types/creator">Creator</span> populate the 
<span data-file-link="./lib/types/action"><code>Actions</code></span> with a dedicated reducer, which we call here.

This means that the code for reducing an action now lives within the action creators themselves instead.
*/

import { AppAction } from './types/appAction'
import { AppState } from './types/appState'
import { initialAppState } from '../../v08/redux/initialAppState'

export const rootReducer: (
  state: AppState | undefined,
  action: AppAction
) => AppState = (state = initialAppState, action) =>
  action.reducer ? action.reducer(state, action.payload) : state
