/* REFAC|EDITCOMMENT
This `Reducer` shape is now added to all <span data-file-link="./action">Actions</span>. 

The reducers will be populated by the <span data-file-link="../factory">action creator factory</span>, and consumed in the <span data-file-link="../../rootReducer"><code>rootReducer</code></span>.
*/

export type Reducer<State, Payload> = (state: State, payload: Payload) => State
