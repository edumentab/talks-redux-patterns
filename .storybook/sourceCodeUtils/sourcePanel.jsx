import React, { useEffect, useState, useCallback } from 'react'
import Highlighter from './sourceHighlighter'
import path from 'path'
import SourceCodePanelControls from './sourcePanel.controls'
import { stateToIcon } from './stateToIcon'
import './sourcePanel.css'
import ReactMarkdown from 'react-markdown/with-html'
import { matchPathToFile } from '../../.refac'

import { Tag, Callout } from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const stateExplanation = {
  deleted: 'Deleted in this version (previous file shown below)',
  nonexistent: `Doesn't exist in this version`,
  created: `Created in this version`,
  unchanged: `Unchanged from previous version`,
  pruned: `Some code removed in this version (see diff below source)`,
  grown: `Some code added in this version (see diff below source)`,
  replaced: `Some code replaced in this version (see diff below source)`,
  edited: `Edited in this version (see diff below source)`,
  eternal: 'No changes in any version'
}

const SourceCodePanel = props => {
  const { channel, fileInfo } = props
  const fileDiff = fileInfo.files
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
      const { version: newVersion, file: foundFile } =
        matchPathToFile({
          sourceData: fileInfo,
          file: filePath,
          path: fullPath,
          version
        }) || {}
      if (!foundFile) {
        console.warn('WARNING! Failed to find file', fullPath)
        return
      }
      if (foundFile !== filePath || newVersion !== version) {
        const newHistory = fileState.history
          .slice(0, fileState.idx + 1)
          .concat({ filePath: foundFile, version: newVersion || version })
        const newIdx = newHistory.length - 1
        setFileState({ history: newHistory, idx: newIdx })
      }
    },
    [filePath, fileInfo, fileState.idx, fileState.history, version]
  )
  useEffect(() => {
    channel.on('sourceCode/selectedStory', handleFileChange)
    return () => channel.removeListener('sourceCode/selectedStory')
  }, [channel, handleFileChange])

  if (!props.active) return null

  const { state, editComment } =
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
      {editComment && (
        <div className="editComment">
          <Callout icon="info-sign">
            <ReactMarkdown source={editComment} />
          </Callout>
        </div>
      )}
      <Highlighter
        language={filePath.match(/.css$/) ? 'css' : 'javascript'}
        fileInfo={fileDiff[filePath] && fileDiff[filePath]}
        version={version}
        onLinkClick={handleFileChange}
      />
    </div>
  )
}

export default SourceCodePanel
