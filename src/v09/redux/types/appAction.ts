import { Action } from '../lib/types/action'

export type AppAction<T extends string = string, P = any> = Action<T, P>
