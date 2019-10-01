import { Reducer } from './reducer'

export type Action<T extends string, P, S extends object> = {
  type: T
  error?: boolean
  sender?: string
  reducer?: Reducer<S, P>
  payload: P
}

export type ActionType<A> = A extends Action<infer T, any, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P, any>
  ? P
  : never
export type ActionState<A> = A extends Action<string, any, infer S> ? S : never
