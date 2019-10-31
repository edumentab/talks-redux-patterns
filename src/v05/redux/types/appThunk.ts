/* REFAC|EDITCOMMENT
This is a a new type introduced in this version, that it is now legal to `.dispatch` in our <span data-file-link="./appStore.ts"><code>AppStore</code></span>.

The `AppThunkCreator` type is used in our new thunk creators, to which we've moved side effect code from the app components. There are two such instances:

* extracting from <span data-file-link="../../app/Main"><code>Main.tsx</code></span> into <span data-file-link="../slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span>
* extracting from <span data-file-link="../../app/Theme"><code>Theme.tsx</code></span> into <span data-file-link="../slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>
*/

import { Thunk, ThunkCreator } from '../lib/types/thunk'

import { AppAction } from './appAction'
import { AppState } from './appState'

export type AppThunkCreator<O = undefined> = ThunkCreator<
  AppAction,
  AppState,
  O
>

export type AppThunk = Thunk<AppAction, AppState>
