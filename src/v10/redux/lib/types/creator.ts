/* REFAC|EDITCOMMENT
The <span data-file-link="../factory"><code>factory</code></span> will now pass a <span data-file-link="./reducer"><code>Reducer</code></span> to the creators which they will use to populate the <span data-file-link="./action"><code>Actions</code></span>.

These reducers are then consumed in the central <span data-file-link="../../rootReducer"><code>rootReducer</code></span>.
*/

import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export interface ActionCreator<
  A extends Action<string, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> {
  actionType?: ActionType<A>
  (...args: ActionPayload<A> extends undefined ? void[] : Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>>
  }
}
