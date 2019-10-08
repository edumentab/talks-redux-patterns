import React, { useEffect, useState, useCallback } from 'react'
import Highlighter from './sourceHighlighter'
import path from 'path'
import SourceCodePanelControls from './sourcePanel.controls'
import { stateToIcon } from './stateToIcon'
import './sourcePanel.css'

import fileInfo from '../../fileDiff.json'
import { Tag } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const fileDiff = fileInfo.files

const stateExplanation = {
  deleted: 'Deleted in this version',
  nonexistent: `Doesn't exist in this version`,
  created: `Created in this version`,
  unchanged: `Unchanged from previous version`,
  edited: `Edited in this version (see diff below source)`,
  eternal: 'No changes in any version'
}

const SourceCodePanel = props => {
  const { channel } = props
  const [fileState, setFileState] = useState({ history: [], idx: 0 })
  const { filePath, version } = fileState.history[fileState.idx] || {
    filePath: '',
    version: 'v01'
  }
  const handleVersionChange = useCallback(
    newVersion => {
      const newHistory = fileState.history
        .slice(0, fileState.idx + 1)
        .concat({ filePath, version: newVersion })
      const newIdx = newHistory.length - 1
      setFileState({ history: newHistory, idx: newIdx })
    },
    [filePath, fileState.idx, fileState.history]
  )
  const handleFileChange = useCallback(
    fullPath => {
      const newVersion = (fullPath.match(/\.\/src\/(v[0-9]*)\//) || [])[1]
      const path = fullPath.replace(/\.\/src\/v[0-9]*\//, '')
      const foundFile = matchPathToSource(path)
      if (foundFile && foundFile.name !== filePath) {
        const newHistory = fileState.history
          .slice(0, fileState.idx + 1)
          .concat({ filePath: foundFile.name, version: newVersion || version })
        const newIdx = newHistory.length - 1
        setFileState({ history: newHistory, idx: newIdx })
      } else {
        console.warn(
          'WARNING! Selected source path not found among files',
          path
        )
      }
    },
    [filePath, fileState.idx, fileState.history, version]
  )
  useEffect(() => {
    channel.on('sourceCode/selectedStory', handleFileChange)
    return () => channel.removeListener('sourceCode/selectedStory')
  }, [channel, handleFileChange])

  if (!props.active) return null

  const handleLinkClick = p => {
    const rel = path.join(filePath.replace(/\/[^/]*$/, '/'), p)
    const found = [
      '/index.jsx',
      '/index.js',
      '/index.ts',
      '/index.tsx',
      '.jsx',
      '.js',
      '.tsx',
      '.ts',
      '.css',
      ''
    ]
      .map(suff => rel + suff)
      .find(p => !!fileDiff[p])
    if (found) {
      handleFileChange(found)
    } else {
      console.warn('WARNING - could not find corresponding file in list', rel)
    }
  }

  const { state } =
    (filePath && fileInfo.files[filePath].versions[version]) || {}

  return (
    <div className="sourcePanel">
      <SourceCodePanelControls
        filePath={filePath}
        fileState={fileState}
        setFileState={setFileState}
        files={Object.values(fileDiff)}
        handleVersionChange={handleVersionChange}
        handleFileChange={handleFileChange}
        version={version}
        versions={fileInfo.versions}
      />
      {state && (
        <div key={filePath + version} className="fileExplanation">
          <Tag multiline>
            <FontAwesomeIcon icon={stateToIcon[state]} />
            {stateExplanation[state]}
          </Tag>
        </div>
      )}
      <Highlighter
        language={filePath.match(/.css$/) ? 'css' : 'javascript'}
        fileInfo={fileDiff[filePath] && fileDiff[filePath]}
        version={version}
        onLinkClick={handleLinkClick}
      />
    </div>
  )
}

export default SourceCodePanel

function matchPathToSource(path) {
  const files = Object.values(fileDiff)
  return files.find(
    file => file.name.includes(path) || path.includes(file.name)
  )
}
