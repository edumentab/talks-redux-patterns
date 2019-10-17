import { AppStore, makeStore, MakeStoreOpts } from '../redux'

/*
The exported `makeTestStore` function is a very thin wrapper around the regular
`makeStore` function. The only thing is does is to put a spying mock around the
dispatch method, allowing you to do stuff like this in your tests:

```
expect(store.dispatch).toHaveBeenCalledWith(someActionCreator())
```
*/

export type TestStore = AppStore & { dispatch: jest.Mock<AppStore['dispatch']> }

export function makeTestStore(opts: MakeStoreOpts = {}) {
  const store = makeStore(opts)
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store as TestStore
}
