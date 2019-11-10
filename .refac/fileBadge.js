import React, { useCallback } from 'react'

import { stateToIcon } from './stateToIcon'
import './sourcePanel.css'

import { Tag } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const stateExplanation = {
  deleted: 'Deleted in this version (previous file shown below)',
  nonexistent: `Doesn't exist in this version`,
  created: `Created in this version`,
  unchanged: `Unchanged from previous version`,
  initial: `Initial version`,
  pruned: `Some code removed in this version (see diff below source)`,
  grown: `Some code added in this version (see diff below source)`,
  replaced: `Some code replaced in this version (see diff below source)`,
  edited: `Edited in this version (see diff below source)`,
  eternal: 'No changes in any version'
}

export const FileBadge = props => {
  const { fileData, version } = props
  const { state } = fileData.versions[version] || {}

  return (
    <div key={version + fileData.name} className="fileExplanation">
      <Tag multiline>
        <FontAwesomeIcon icon={stateToIcon[state]} />
        {stateExplanation[state]}
      </Tag>
    </div>
  )
}
