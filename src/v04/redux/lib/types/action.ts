/* REFAC|EDITCOMMENT
We add `ActionType` and `ActionPayload` helpers, to allow us to elsewhere extract the `type`/`payload` from an `Action`. 

This is used in the new <span data-file-link="../factory.ts"><code>loadSetsSuccess</code></span> for action creators, and in the new <span data-file-link="./creator.ts"><code>Creator</code></span> type that the factory uses.
*/

export type Action<T extends string, P> = {
  type: T
  error?: boolean
} & (P extends undefined
  ? {}
  : {
      payload: P
    })

export type ActionType<A> = A extends Action<infer T, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P> ? P : never
