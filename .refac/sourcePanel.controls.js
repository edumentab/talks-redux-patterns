import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

import {
  MenuItem,
  Classes,
  Icon,
  Button,
  ControlGroup
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@blueprintjs/core/lib/css/blueprint.css'
import { stateToIcon } from './stateToIcon'

const fileSorter = (o1, o2) => (o1.name < o2.name ? -1 : 1)

const fileIsTouched = (file, version) =>
  (version === 'v01'
    ? [
        'created',
        'edited',
        'pruned',
        'grown',
        'replaced',
        'eternal',
        'unchanged'
      ]
    : ['created', 'edited', 'pruned', 'grown', 'replaced']
  ).includes(file.versions[version].state)

const SourceCodePanelControls = props => {
  const { codeState, brain, sourceData, versions } = props
  const files = Object.values(sourceData.files)
  let { file: filePath, version } = codeState || {}

  const file = files.filter(f => f.name === filePath)[0]

  const [query, setQuery] = useState('')

  const touched = files.filter(f => fileIsTouched(f, version)).sort(fileSorter)
  const deleted = files
    .filter(f => f.versions[version].state === 'deleted')
    .sort(fileSorter)
  const untouched = files
    .filter(f => !fileIsTouched(f, version) && !deleted.includes(f))
    .sort(fileSorter)
  const listFiles = touched.concat(deleted).concat(untouched)

  const renderFileItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const curV = option.versions[version]
      const currentlySelected = filePath === option.name
      return (
        <MenuItem
          className={classNames(
            Classes.TEXT_SMALL,
            !fileIsTouched(option, version) && 'untouchedItem',
            option === untouched[0] && 'firstUntouchedItem',
            option.versions[version].state === 'deleted' && 'deletedItem',
            option === deleted[0] && 'firstDeletedItem'
          )}
          key={option.name}
          icon={
            <Icon icon={currentlySelected ? 'tick' : 'blank'} iconSize={10} />
          }
          active={modifiers.active}
          text={option.name}
          shouldDismissPopover={false}
          onClick={handleClick}
          labelElement={<FontAwesomeIcon icon={stateToIcon[curV.state]} />}
        />
      )
    },
    [filePath, version, untouched, deleted]
  )

  const renderVersionItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const currentlySelected = version === option
      return (
        <MenuItem
          className={`${Classes.TEXT_SMALL} Editor_Menu_Item`}
          key={option}
          icon={
            <Icon icon={currentlySelected ? 'tick' : 'blank'} iconSize={10} />
          }
          active={modifiers.active}
          text={option}
          shouldDismissPopover={false}
          onClick={handleClick}
          labelElement={
            file && (
              <FontAwesomeIcon
                icon={stateToIcon[file.versions[option].state]}
              />
            )
          }
        />
      )
    },
    [version, file]
  )

  return (
    <ControlGroup>
      <Button
        disabled={!codeState.canGoBack}
        icon="step-backward"
        onClick={brain.goBack}
      />
      <Button
        disabled={!codeState.canGoForward}
        icon="step-forward"
        onClick={brain.goForward}
      />
      <Select
        key={`files-${version}`}
        items={listFiles.filter(option =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )}
        itemRenderer={renderFileItem}
        onItemSelect={option => brain.clickLink(option.name)}
        popoverProps={{ minimal: true }}
        onQueryChange={setQuery}
        className="fileSelector"
      >
        <Button rightIcon="double-caret-vertical">
          <span>{filePath || 'Select a file'}</span>
        </Button>
      </Select>
      <Select
        key="versions"
        items={versions}
        itemRenderer={renderVersionItem}
        onItemSelect={brain.clickLink}
        popoverProps={{ minimal: true }}
        filterable={false}
      >
        <Button
          text={version || 'Select a version'}
          rightIcon="double-caret-vertical"
        />
      </Select>
    </ControlGroup>
  )
}

export default SourceCodePanelControls