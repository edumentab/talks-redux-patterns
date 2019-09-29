import { Action, ActionPayload, ActionType } from './action'

export type ActionCreator<A extends Action<string, any>> = ActionPayload<
  A
> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A>

interface WithActionType<T = string> {
  actionType: T
}

export interface PayloadActionCreator<A extends Action<string, any>>
  extends WithActionType<ActionType<A>> {
  (payload: ActionPayload<A>): {
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
