/* REFAC|EDITCOMMENT
The <span data-file-link="../factory"><code>factory</code></span> will now pass a `reducer` to the creators which they will use to populate the <span data-file-link="./action"><code>Actions</code></span>.

These reducers are then consumed in the central <span data-file-link="../../rootReducer"><code>rootReducer</code></span>.
*/

import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export type ActionCreator<
  A extends Action<string, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> = ActionPayload<A> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A, Sig>

interface WithActionType<T = string> {
  actionType: T
}

export interface PayloadActionCreator<
  A extends Action<string, any, any>,
  Sig extends Array<any> & { 0: any }
> extends WithActionType<ActionType<A>> {
  (...args: Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}

export interface NakedActionCreator<A extends Action<string, undefined, any>>
  extends WithActionType<ActionType<A>> {
  (): {
    type: ActionType<A>
    payload: undefined
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}
