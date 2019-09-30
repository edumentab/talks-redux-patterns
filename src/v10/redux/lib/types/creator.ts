import { Action, ActionPayload, ActionType, ActionState } from './action'
import { Reducer } from './reducer'

export type ActionCreator<A extends Action<string, any, any>> = ActionPayload<
  A
> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A>

interface WithActionType<T = string> {
  actionType: T
}

export interface PayloadActionCreator<A extends Action<string, any, any>>
  extends WithActionType<ActionType<A>> {
  (payload: ActionPayload<A>): {
    type: ActionType<A>
    payload: ActionPayload<A>
    reducer: Reducer<ActionState<A>, ActionPayload<A>> //PayloadReducer<ActionState<A>, ActionPayload<A>>
  }
}

export interface NakedActionCreator<A extends Action<string, undefined, any>>
  extends WithActionType<ActionType<A>> {
  (): {
    type: ActionType<A>
    payload: undefined
    reducer: Reducer<ActionState<A>, ActionPayload<A>> //NakedReducer<ActionState<A>>
  }
}
