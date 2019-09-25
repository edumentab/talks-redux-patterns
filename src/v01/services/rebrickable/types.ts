export type Theme = {
  id: number
  parent_id: number
  name: string
}

export type Set = {
  set_num: string
  name: string
  year: number
  theme_id: number
  num_parts: number
  set_img_url: string
  set_url: string
  last_modified_dt: string
}
