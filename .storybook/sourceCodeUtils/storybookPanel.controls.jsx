import React, { useState, useCallback } from 'react'

import {
  MenuItem,
  Classes,
  Icon,
  Button,
  ControlGroup
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSkullCrossbones,
  faGhost,
  faStar,
  faEllipsisH,
  faPen,
  faInfinity
} from '@fortawesome/free-solid-svg-icons'
import '@blueprintjs/core/lib/css/blueprint.css'
import './storybookPanel.css'

const stateToIcon = {
  deleted: faSkullCrossbones,
  nonexistent: faGhost,
  created: faStar,
  unchanged: faEllipsisH,
  edited: faPen,
  eternal: faInfinity
}

const SourceCodePanelControls = props => {
  const {
    filePath,
    fileState,
    setFileState,
    files,
    handleToggleCompiled,
    handleFileChange,
    version,
    versions,
    handleVersionChange
  } = props

  const file = files.filter(f => f.name === filePath)[0]

  const [query, setQuery] = useState('')

  const handleBack = () =>
    setFileState({
      history: fileState.history,
      idx: Math.max(0, fileState.idx - 1)
    })
  const handleForward = () =>
    setFileState({
      history: fileState.history,
      idx: Math.min(fileState.idx + 1, fileState.history.length - 1)
    })

  const renderFileItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const curV = option.versions[version]
      const currentlySelected = filePath === option.name
      return (
        <MenuItem
          className={`${Classes.TEXT_SMALL} Editor_Menu_Item`}
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
    [filePath, version]
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
    [version, filePath, file]
  )

  return (
    <ControlGroup>
      <Button
        disabled={fileState.idx === 0}
        icon="step-backward"
        onClick={handleBack}
      />
      <Button
        disabled={fileState.idx === fileState.history.length - 1}
        icon="step-forward"
        onClick={handleForward}
      />
      <Select
        key="files"
        items={files.filter(option =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )}
        itemRenderer={renderFileItem}
        onItemSelect={option => handleFileChange(option.name)}
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
        onItemSelect={handleVersionChange}
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
