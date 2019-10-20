import {
  faSkullCrossbones,
  faGhost,
  faStar,
  faEllipsisH,
  faPen,
  faInfinity,
  faCut,
  faPlus,
  faArrowsAltH
} from '@fortawesome/free-solid-svg-icons'

export const stateToIcon = {
  deleted: faSkullCrossbones,
  nonexistent: faGhost,
  created: faStar,
  unchanged: faEllipsisH,
  edited: faPen,
  eternal: faInfinity,
  pruned: faCut,
  grown: faPlus,
  replaced: faArrowsAltH
}
