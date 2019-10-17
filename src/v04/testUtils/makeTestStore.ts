import { AppStore, makeStore, MakeStoreOpts } from '../redux'
import { StoreEnhancer } from 'redux'

/*
The exported `makeTestStore` function is a very thin wrapper around the regular
`makeStore` function. The only thing is does is to put a spying mock around the
dispatch method, allowing you to do stuff like this in your tests:

```
expect(store.dispatch).toHaveBeenCalledWith(someActionCreator())
```
*/

export type TestStore = AppStore & { dispatch: jest.Mock<AppStore['dispatch']> }

const testStoreEnhancer: StoreEnhancer = createStore => (
  reducer,
  initialState
) => {
  const store = createStore(reducer, initialState)
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}

export function makeTestStore(opts: MakeStoreOpts = {}) {
  return makeStore({
    ...opts,
    enhancers: [testStoreEnhancer]
  }) as TestStore
}
