export type Action<T extends string, P> = {
  type: T
  error?: boolean
  payload: P
}

export type ActionType<A> = A extends Action<infer T, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P> ? P : never
