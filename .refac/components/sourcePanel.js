import React, { useEffect, useState, useCallback } from 'react'
import Highlighter from './sourceHighlighter'
import path from 'path'
import SourceCodePanelControls from './sourcePanel.controls'
import './sourcePanel.css'
import { Markdown } from './markdown'
import { FileBadge } from './fileBadge'
import { matchPathToFile } from '..'

import { Callout } from '@blueprintjs/core'

const SourceCodePanel = props => {
  const { sourceData, brain } = props
  const [codeState, setCodeState] = useState(brain.getState().code)
  useEffect(() => {
    brain.subscribe(brainState => {
      setCodeState(brainState.code)
    })
  }, [brain])

  const { file = '', version } = codeState || {}

  if (!props.active) return null

  const { state, editComment } =
    (file && sourceData.files[file].versions[version]) || {}

  return (
    <div className="sourcePanel">
      <SourceCodePanelControls
        codeState={codeState}
        sourceData={sourceData}
        brain={brain}
        versions={sourceData.versions}
      />
      {state && (
        <FileBadge
          fileData={sourceData.files[file]}
          version={version}
          onLinkClick={brain.clickLink}
        />
      )}
      {editComment && (
        <div className="editComment">
          <Callout icon="info-sign">
            <Markdown markdown={editComment} onLinkClick={brain.clickLink} />
          </Callout>
        </div>
      )}
      {sourceData.files[file] ? (
        <Highlighter
          language={file.match(/.css$/) ? 'css' : 'javascript'}
          fileInfo={sourceData.files[file]}
          version={version}
          onLinkClick={brain.clickLink}
        />
      ) : null}
    </div>
  )
}

export default SourceCodePanel
