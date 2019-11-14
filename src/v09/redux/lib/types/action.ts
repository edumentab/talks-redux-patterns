/* REFAC|EDITCOMMENT
In this version we introduce `sender` as part of the basic `Action` shape. This will be injected in....

* the <span data-file-link="../consequence"><code>ConsequenceMiddleware</code></span>
* the <span data-file-link="../../../app/useDispatchWithSender"><code>useDispatchWithSender</code> hook</span>

...for the data and UI layer respectively.
*/

export type Action<T extends string, P> = {
  type: T
  error?: boolean
  payload: P
  sender?: string
}

export type ActionType<A> = A extends Action<infer T, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P> ? P : never
