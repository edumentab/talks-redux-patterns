/* REFAC|EDITCOMMENT
Because <span data-file-link="../../lib/types/reducer"><code>Reducers</code></span> for individual <span data-file-link="../../lib/types/action"><code>Actions</code></span> are now given directly to the <span data-file-link="../../lib/factory"><code>factory</code></span> instead, we delete this reducer and move the code into the action creators instead (in this case only <span data-file-link="./actions/makeGuess"><code>makeGuess</code></span>).

The <span data-file-link="../../rootReducer"><code>rootReducer</code></span> - instead of being made up by a combination of `guessingGameReducer`, <span data-file-link="../rebrickable/reducer"><code>rebrickableReducer</code></span> and <span data-file-link="../ui/reducer"><code>uiReducer</code></span> - will now simply call the `reducer` in the given action.
*/
