import { fetch } from '../fetch'
import { token } from './token'
import { Set } from './types'
import { ById } from '../../utilTypes'

type APISetsResult = {
  results: Set[]
}

export const getSetsForTheme = (themeId: number): Promise<ById<Set>> =>
  fetch(
    `https://rebrickable.com/api/v3/lego/sets/?page_size=1000&theme_id=${themeId}&key=${token}`
  )
    .then(response => response.json())
    .then((result: APISetsResult) =>
      result.results.reduce((acc, t) => ({ ...acc, [t.set_num]: t }), {})
    )
    .catch(e => Promise.reject({ error: e }))
