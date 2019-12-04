import React, { useState, useCallback } from 'react'
import classNames from 'classnames'
import { useAddonState } from '@storybook/api'

import {
  MenuItem,
  Classes,
  Icon,
  Button,
  ControlGroup
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

import '@blueprintjs/core/lib/css/blueprint.css'
import { StateIcon } from './stateIcon'
import { makeFileList } from '../makeFileList'

const SourceCodePanelControls = props => {
  const [showParsed, setShowParsed] = useAddonState('code-show-parsed', false)
  const { codeState, brain, sourceData, versions } = props
  const files = Object.values(sourceData.files)
  let { file: filePath, version } = codeState || {}

  const file = files.filter(f => f.name === filePath)[0]
  const fileI = file && file.versions[version]
  const code = fileI && file.raw[fileI.which]
  const ts = fileI && file.parsed[fileI.which]

  const [query, setQuery] = useState('')

  const listFiles = makeFileList(sourceData, version)

  const renderFileItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const currentlySelected = filePath === option.name
      return (
        <MenuItem
          className={classNames(
            Classes.TEXT_SMALL,
            `group-${option.group}`,
            option.firstInGroup && 'firstInGroup'
          )}
          key={option.name}
          icon={
            <Icon icon={currentlySelected ? 'tick' : 'blank'} iconSize={10} />
          }
          active={modifiers.active}
          text={option.name}
          shouldDismissPopover={false}
          onClick={handleClick}
          labelElement={<StateIcon state={option.state} />}
        />
      )
    },
    [filePath]
  )

  const renderVersionItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const currentlySelected = version === option
      if (!file || !file.versions[option]) return null
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
            file && <StateIcon state={file.versions[option].state} />
          }
        />
      )
    },
    [version, file]
  )

  const handleParsedClick = useCallback(() => setShowParsed(!showParsed), [
    showParsed,
    setShowParsed
  ])

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
      {ts && ts !== code && (
        <button
          className={classNames(
            'bp3-button parsebtn',
            showParsed ? 'js' : 'ts'
          )}
          onClick={handleParsedClick}
        >
          <img className="tsimg" src="tslogo.png" />
          <img className="jsimg" src="jslogo.png" />
        </button>
      )}
    </ControlGroup>
  )
}

export default SourceCodePanelControls
