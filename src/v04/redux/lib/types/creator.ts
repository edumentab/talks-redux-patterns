/* REFAC|EDITCOMMENT
This type is used internally by the <span data-file-link="../factory.ts">action creator <code>factory</code></span>.

The little `ActionPayload<A> extends undefined` dance is to allow creators for actions with no payload (such as <span data-file-link="../../slices/rebrickable/actions/loadThemesInit.ts"><code>loadThemesInit</code></span>) to be called with no arguments instead of `undefined`.
*/

import { Action, ActionPayload, ActionType } from './action'

export interface ActionCreator<
  A extends Action<string, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> {
  actionType?: ActionType<A>
  (...args: ActionPayload<A> extends undefined ? void[] : Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
  }
}
