import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSkullCrossbones,
  faGhost,
  faStar,
  faEllipsisH,
  faPen,
  faInfinity
} from '@fortawesome/free-solid-svg-icons'

export const PresentationV01 = () => {
  return (
    <div>
      <h3>Source file icon legend</h3>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <FontAwesomeIcon icon={faGhost} />: Non-existent in this version
        </li>
        <li>
          <FontAwesomeIcon icon={faStar} />: Created
        </li>
        <li>
          <FontAwesomeIcon icon={faEllipsisH} />: No change
        </li>
        <li>
          <FontAwesomeIcon icon={faPen} />: Edited
        </li>
        <li>
          <FontAwesomeIcon icon={faSkullCrossbones} />: Deleted
        </li>
        <li>
          <FontAwesomeIcon icon={faInfinity} />: Same in every version
        </li>
      </ul>
      <ReactMarkdown
        source={`
### Patterns already applied

* Full app-redux split
* RSA

`}
      />
    </div>
  )
}
