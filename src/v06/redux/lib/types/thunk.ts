type ThunkCreatorWithoutOptions<A, S> = () => Thunk<A, S>
type ThunkCreatorWithOptions<A, S, O> = (opts: O) => Thunk<A, S>

export type ThunkCreator<A, S, O = undefined> = O extends undefined
  ? ThunkCreatorWithoutOptions<A, S>
  : ThunkCreatorWithOptions<A, S, O>

export type Thunk<A, S> = (
  dispatch: (action: A) => void,
  getState: () => S
) => void
