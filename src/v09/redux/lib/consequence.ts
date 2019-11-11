/* REFAC|EDITCOMMENT
The <span data-file-link="./types/action">basic <code>Action</code> shape</span> shape can now hold a `.sender` property. We put a façade over `.dispatch` that will set `.sender` to the name of the <span data-file-link="./types/consequence"><code>Consequence</code></span>. No changes has to be made in the definitions for the actual consequences, but their tests (for <span data-file-link="../slices/rebrickable/actions/loadThemesInit.consequence.test"><code>loadThemesInit</code></span> and <span data-file-link="../slices/rebrickable/actions/loadSetsInit.consequence.test"><code>loadSetsInit</code></span>) need to accommodate for this new property.

In the UI layer `.sender` is instead populated by the new <span data-file-link="../../app/useDispatchWithSender"><code>useDispatchWithSender</code> hook</span>.
*/

import { ConsequenceGetter } from './types/consequence'
import { Middleware } from 'redux'

export const createConsequenceMiddleware = <S extends object, D extends object>(
  consGetter: ConsequenceGetter<S, D>,
  deps: D
): Middleware => ({ dispatch, getState }) => next => action => {
  next(action)
  for (const cons of consGetter({ action, getState, deps })) {
    cons({
      action,
      getState,
      deps,
      dispatch: a =>
        dispatch({
          ...a,
          sender: `CONSEQUENCE(${cons.displayName || cons.name})`
        })
    })
  }
}
