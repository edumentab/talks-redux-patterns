const PERSIST_STORES = false

export function storeFacade(brain) {
  const oldDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  const storeStore = {}
  const facade = nextCreator => {
    const creator = oldDevTools()(nextCreator)
    return (reducer, initState) => {
      const curVersion = brain.getState().code.version
      brain.resetRedux(initState)
      if (curVersion && storeStore[curVersion] && PERSIST_STORES) {
        return storeStore[curVersion]
      }
      const store = creator(reducer, initState)
      const origDispatch = store.dispatch.bind(store)
      store.dispatch = action => {
        origDispatch(action)
        const newState = store.getState()
        brain.logAction(action, newState)
        console.log('DISPATCHED ACTION', action)
        console.log('NEW STATE', newState)
      }
      if (curVersion) storeStore[curVersion] = store
      return store
    }
  }
  window.__REDUX_DEVTOOLS_EXTENSION__ = () => facade
}
