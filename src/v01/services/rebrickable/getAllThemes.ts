import { fetch } from '../fetch'
import { token } from './token'
import { Theme, ThemeRaw } from './types'
import { ById } from '../../utilTypes'

type APIthemesResult = {
  results: ThemeRaw[]
}

export const getAllThemes = (): Promise<ById<Theme>> =>
  fetch(
    `https://rebrickable.com/api/v3/lego/themes/?page_size=1000&key=${token}`
  )
    .then((response: any) => response.json())
    .then((result: APIthemesResult) =>
      result.results.reduce(
        (acc, t) => ({ ...acc, [t.id]: { ...t, sets: {} } }),
        {}
      )
    )
    .catch(e => Promise.reject({ error: e }))
