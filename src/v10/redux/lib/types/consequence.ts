export type ConsequenceAPI<A, S, D> = {
  dispatch: (action: A) => void
  getState: () => S
  deps: D
  action: A
}

export type Consequence<A, S, D> = ((api: ConsequenceAPI<A, S, D>) => void) & {
  name: string
}

export type ConsequenceGetter<A, S, D> = (
  api: ConsequenceAPI<A, S, D>
) => Consequence<A, S, D>[]
