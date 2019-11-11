import React, { useCallback } from 'react'

import { StateIcon } from './stateIcon'

import { Tag } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Markdown } from './markdown'

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

const editStates = ['pruned', 'grown', 'replaced', 'edited']

function vlink(version) {
  return `<span data-file-link="${version}">${version}</span>`
}

export const FileBadge = props => {
  const { fileData, version, onLinkClick } = props
  const { created, deleted, edited } = Object.entries(fileData.versions).reduce(
    (memo, [v, fv]) => {
      if (fv.state === 'created') memo.created = v
      else if (fv.state === 'deleted') memo.deleted = v
      else if (editStates.includes(fv.state)) memo.edited.push(v)
      return memo
    },
    { created: null, deleted: null, edited: [] }
  )

  const { state } = fileData.versions[version] || {}
  let markdown = stateExplanation[state] + '.'

  if (editStates.includes(state) && edited.length > 1) {
    markdown += ` Also edited in ${edited
      .filter(v => v !== version)
      .map(vlink)
      .join(', ')}.`
  }
  if (state !== 'created' && created)
    markdown += ` Created in ${vlink(created)}.`
  if (!editStates.includes(state) && edited.length) {
    markdown += ` Edited in ${edited.map(vlink).join(', ')}.`
  }
  if (state !== 'deleted' && deleted)
    markdown += ` Deleted in ${vlink(deleted)}.`

  return (
    <div key={version + fileData.name} className="fileExplanation">
      <Tag multiline>
        <StateIcon state={state} />
        <Markdown markdown={markdown} onLinkClick={onLinkClick} />
      </Tag>
    </div>
  )
}
