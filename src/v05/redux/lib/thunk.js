// Actual source code of redux-thunk
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.js

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      console.log('WTF?!?!?! :/', action)
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
