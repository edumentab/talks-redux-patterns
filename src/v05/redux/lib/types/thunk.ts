import { AppAction, AppState } from '../../types'

export type AppThunkCreator<O = undefined> = ThunkCreator<
  AppAction,
  AppState,
  O
>

export type ThunkCreator<A, S, O = undefined> = O extends undefined
  ? ThunkCreatorWithoutOptions<A, S>
  : ThunkCreatorWithOptions<A, S, O>

type ThunkCreatorWithoutOptions<A, S> = () => Thunk<A, S>

type ThunkCreatorWithOptions<A, S, O> = (opts: O) => Thunk<A, S>

type Thunk<A, S> = (dispatch: (action: A) => void, getState: () => S) => void
