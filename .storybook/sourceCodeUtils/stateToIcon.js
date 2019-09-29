import {
  faSkullCrossbones,
  faGhost,
  faStar,
  faEllipsisH,
  faPen,
  faInfinity
} from '@fortawesome/free-solid-svg-icons'

export const stateToIcon = {
  deleted: faSkullCrossbones,
  nonexistent: faGhost,
  created: faStar,
  unchanged: faEllipsisH,
  edited: faPen,
  eternal: faInfinity
}
