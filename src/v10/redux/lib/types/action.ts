/* REFAC|EDITCOMMENT
In this version we introduce `reducer` as part of the basic `Action` shape. This means we must add the app state to list of generic arguments (and so we must tweak <span data-file-link="../../types/appAction"><code>AppAction</code></span> and <span data-file-link="./consequence"><code>Consequence</code></span>), as the state is needed to type the reducer.

The reducers will be populated by the <span data-file-link="../factory">action creator factory</span>, and consumed in the <span data-file-link="../../rootReducer"><code>rootReducer</code></span>.
*/

import { Reducer } from './reducer'

export type Action<T extends string, P, S extends object> = {
  type: T
  error?: boolean
  payload: P
  sender?: string
  reducer?: Reducer<S, P>
}

export type ActionType<A> = A extends Action<infer T, any, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P, any>
  ? P
  : never
export type ActionState<A> = A extends Action<string, any, infer S> ? S : never
