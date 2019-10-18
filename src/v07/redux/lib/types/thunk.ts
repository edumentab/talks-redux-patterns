type ThunkCreatorWithoutOptions<A, S, D> = () => Thunk<A, S, D>
type ThunkCreatorWithOptions<A, S, D, O> = (opts: O) => Thunk<A, S, D>

export type ThunkCreator<A, S, D, O = undefined> = O extends undefined
  ? ThunkCreatorWithoutOptions<A, S, D>
  : ThunkCreatorWithOptions<A, S, D, O>

export type Thunk<A, S, D> = (
  dispatch: (action: A) => void,
  getState: () => S,
  deps: D
) => void
