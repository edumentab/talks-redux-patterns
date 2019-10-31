/* REFAC|EDITCOMMENT
Types used inside our new <span data-file-link="../../types/appThunk"><code>AppThunk</code></span> type.

Just like the actual <span data-file-link="../thunk.js"><code>thunk.js</code></span> source this would normally come from the npm package, but is included here as a local file for clarity.
*/

type ThunkCreatorWithoutOptions<A, S> = () => Thunk<A, S>
type ThunkCreatorWithOptions<A, S, O> = (opts: O) => Thunk<A, S>

export type ThunkCreator<A, S, O = undefined> = O extends undefined
  ? ThunkCreatorWithoutOptions<A, S>
  : ThunkCreatorWithOptions<A, S, O>

export type Thunk<A, S> = (
  dispatch: (action: A) => void,
  getState: () => S
) => void
