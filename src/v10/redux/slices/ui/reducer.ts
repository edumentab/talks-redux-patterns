/* REFAC|EDITCOMMENT
Because reducers for individual <span data-file-link="../../lib/types/action"><code>Actions</code></span> are now given directly to the <span data-file-link="../../lib/factory"><code>factory</code></span> instead, we delete this reducer and move the code into the action creators instead (in this case <span data-file-link="./actions/setCurrentSet"><code>setCurrentSet</code></span> and <span data-file-link="./actions/setCurrentTheme"><code>setCurrentTheme</code></span>).

The <span data-file-link="../../rootReducer"><code>rootReducer</code></span> - instead of being made up by a combination of <span data-file-link="../guessingGame/reducer"><code>guessingGameReducer</code></span>, <span data-file-link="../rebrickable/reducer"><code>rebrickableReducer</code></span> and `uiReducer` - will now simply call the `reducer` in the given action.
*/
