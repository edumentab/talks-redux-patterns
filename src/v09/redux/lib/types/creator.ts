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
