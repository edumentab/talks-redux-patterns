/* REFAC|EDITCOMMENT
We have to slightly tweak `ActionCreator` to accommodate for the fact that <span data-file-link="./action"><code>Action</code></span> now takes `Dependencies` as a fourth generic parameter.

The same tweak was made in <span data-file-link="../factory"><code>Factory</code></span>, <span data-file-link="./consequence"><code>Consequence</code></span> and <span data-file-link="../../types/appAction"><code>AppAction</code></span>.
*/

import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export interface ActionCreator<
  A extends Action<string, any, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> {
  actionType?: ActionType<A>
  (...args: ActionPayload<A> extends undefined ? void[] : Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}
