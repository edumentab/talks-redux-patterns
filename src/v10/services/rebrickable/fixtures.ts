import { Theme, Set } from './types'

export const fixtureTheme: Theme = {
  id: 666,
  name: 'Bogus theme',
  parent_id: 1,
  sets: { data: null, loading: false, error: null }
}

export const fixtureSet: Set = {
  name: 'Bogus set',
  num_parts: 666,
  last_modified_dt: 'long ago',
  set_img_url: 'http://arent.i.pretty',
  set_num: '666_2',
  set_url: 'http://elsewhere',
  theme_id: 666,
  year: 666
}
