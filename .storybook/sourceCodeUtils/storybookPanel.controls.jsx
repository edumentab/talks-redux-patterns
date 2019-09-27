import React, { useState, useCallback } from 'react'

import {
  MenuItem,
  Classes,
  Icon,
  Button,
  ControlGroup
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import '@blueprintjs/core/lib/css/blueprint.css'
import './storybookPanel.css'

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
          labelElement={<span>({curV.state})</span>}
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
        />
      )
    },
    [version]
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
        <Button>
          <span>{filePath || 'Select a file FFS'}</span>
          <Icon icon="double-caret-vertical" />
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
