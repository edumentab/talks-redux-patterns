import { Reducer } from './reducer'
import { Consequence } from './consequence'

export interface Action<
  T extends string,
  P,
  S extends object,
  D extends object
> {
  type: T
  error?: boolean
  sender?: string
  reducer?: Reducer<S, P>
  payload: P
  cons?: Consequence<S, D>
}

export type ActionType<A> = A extends Action<infer T, any, any, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P, any, any>
  ? P
  : never
export type ActionState<A> = A extends Action<string, any, infer S, any>
  ? S
  : never
export type ActionDeps<A> = A extends Action<string, any, any, infer D>
  ? D
  : never
