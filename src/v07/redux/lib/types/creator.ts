import { Action, ActionPayload, ActionType } from './action'

export type ActionCreator<
  A extends Action<string, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
> = ActionPayload<A> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A, Sig>

interface WithActionType<T = string> {
  actionType: T
}

export interface PayloadActionCreator<
  A extends Action<string, any>,
  Sig extends Array<any> & { 0: any }
> extends WithActionType<ActionType<A>> {
  (...args: Sig): {
    type: ActionType<A>
    payload: ActionPayload<A>
  }
}

export interface NakedActionCreator<A extends Action<string, undefined>>
  extends WithActionType<ActionType<A>> {
  (): {
    type: ActionType<A>
    payload: undefined
  }
}
