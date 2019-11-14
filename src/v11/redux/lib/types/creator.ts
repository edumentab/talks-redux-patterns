/* REFAC|EDITCOMMENT
We have to slightly tweak `ActionCreator` to accommodate for the fact that <span data-file-link="./action"><code>Action</code></span> now takes `Dependencies` as a fourth generic parameter.

The same tweak was made in <span data-file-link="./consequence"><code>Consequence</code></span> and <span data-file-link="../../types/appAction"><code>AppAction</code></span>.
*/

import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export type ActionCreator<
  A extends Action<string, any, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> = ActionPayload<A> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A, Sig>

interface WithActionType<T = string> {
  actionType: T
}

export interface PayloadActionCreator<
  A extends Action<string, any, any, any>,
  Sig extends Array<any> & { 0: any }
> extends WithActionType<ActionType<A>> {
  (...args: Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}

export interface NakedActionCreator<
  A extends Action<string, undefined, any, any>
> extends WithActionType<ActionType<A>> {
  (): {
    type: ActionType<A>
    payload: undefined
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}
