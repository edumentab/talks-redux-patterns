/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> shape can now hold a `.sender` property. This new `useDispatchWithSender` hook will populate that property correctly, and will be used in our components (<span data-file-link="./Guess"><code>Guess</code></span>, <span data-file-link="./Main"><code>Main</code></span>, <span data-file-link="./SetSelector"><code>SetSelector</code></span> and <span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span>) instead of using the `useDispatch` hook from `react-redux` directly.

In the data layer `.sender` is instead populated by the <span data-file-link="../redux/lib/consequence"><code>ConsequenceMiddleware</code></span>.
*/

import { useDispatch } from 'react-redux'
import { AppAction } from '../redux'

export const useDispatchWithSender = (sender: string) => {
  const originalDispatch = useDispatch()
  return (action: AppAction) => {
    action.sender = `VIEW(${sender})`
    return originalDispatch(action)
  }
}
