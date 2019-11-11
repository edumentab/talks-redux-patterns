import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const stateToIcon = {
  deleted: faSkullCrossbones,
  nonexistent: faGhost,
  created: faStar,
  unchanged: faEllipsisH,
  initial: faEllipsisH,
  edited: faPen,
  eternal: faInfinity,
  pruned: faCut,
  grown: faPlus,
  replaced: faArrowsAltH
}

export const StateIcon = ({ state }) => (
  <FontAwesomeIcon icon={stateToIcon[state]} />
)
