/* REFAC|EDITCOMMENT
This type is the heart of the new **dependency** concept. It is used to augment the <span data-file-link="../lib/types/thunk"><code>Thunk</code></span> and <span data-file-link="./appThunk"><code>AppThunk</code></span> types.

That means <span data-file-link="../makeStore"><code>makeStore</code></span> must now take an object matching this type, which the <span data-file-link="../lib/thunk"><code>thunk</code> middleware</span> will then pass on to our thunks (<span data-file-link="../slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span> and <span data-file-link="../slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>).
*/

import { rebrickableService } from '../../services'

export type AppDeps = {
  rebrickable: typeof rebrickableService
}
