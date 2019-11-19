/* REFAC|EDITCOMMENT
We no longer use slice reducers (<span data-file-link="./slices/guessingGame/reducer"><code>guessingGameReducer</code></span>, <span data-file-link="./slices/rebrickable/reducer"><code>rebrickableReducer</code></span> and <span data-file-link="./slices/ui/reducer"><code>uiGameReducer</code></span>). Instead the <span data-file-link="./lib/factory">factory</span> will make every <span data-file-link="./lib/types/creator">Creator</span> populate the 
<span data-file-link="./lib/types/action"><code>Actions</code></span> with a dedicated <span data-file-link="./lib/types/reducer"><code>Reducer</code></span>, which we call here.

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
