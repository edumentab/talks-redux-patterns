import { ById } from '../../utilTypes'
import { Theme } from './types'
import { getAllThemes } from './getAllThemes'

export const getThemesByParent = (parentId: number): Promise<ById<Theme>> =>
  getAllThemes()
    .then(themesById =>
      Object.values(themesById)
        .filter(theme => theme.parent_id === parentId)
        .reduce((acc, t) => ({ ...acc, [t.id]: t }), {})
    )
    .catch(e => Promise.reject({ error: e }))
