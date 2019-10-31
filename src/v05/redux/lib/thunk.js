/* REFAC|EDITCOMMENT
This is the actual source code for `redux-thunk`. Just like the <span data-file-link="./types/thunk"><code>Thunk</code> types</span> this would normally come from the npm package, but is included here as a local file for clarity.

We use the middleware in the <span data-file-link="../makeStore"><code>makeStore</code></span> function.
*/

// Actual source code of redux-thunk
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.js

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
