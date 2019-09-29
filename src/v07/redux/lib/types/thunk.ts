import { AppAction, AppState, AppDeps } from '../../types'

export type AppThunkCreator<O = undefined> = ThunkCreator<
  AppAction,
  AppState,
  AppDeps,
  O
>

export type AppThunk = Thunk<AppAction, AppState, AppDeps>

export type ThunkCreator<A, S, D, O = undefined> = O extends undefined
  ? ThunkCreatorWithoutOptions<A, S, D>
  : ThunkCreatorWithOptions<A, S, D, O>

type ThunkCreatorWithoutOptions<A, S, D> = () => Thunk<A, S, D>

type ThunkCreatorWithOptions<A, S, D, O> = (opts: O) => Thunk<A, S, D>

type Thunk<A, S, D> = (
  dispatch: (action: A) => void,
  getState: () => S,
  deps: D
) => void
