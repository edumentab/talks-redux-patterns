import addonAPI from '@storybook/addons'

export function storeFacade() {
  const channel = addonAPI.getChannel()
  const oldDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  const storeStore = {}
  const facade = nextCreator => {
    const creator = oldDevTools()(nextCreator)
    return (reducer, initState) => {
      const rState = { state: initState, actions: [] }
      channel.emit('reduxstore', rState)
      const store = creator(reducer, initState)
      const origDispatch = store.dispatch.bind(store)
      store.dispatch = action => {
        origDispatch(action)
        const newState = store.getState()
        rState.state = newState
        rState.actions.push(action)
        channel.emit('reduxstore', rState)
      }
      return store
    }
  }
  window.__REDUX_DEVTOOLS_EXTENSION__ = () => facade
}
