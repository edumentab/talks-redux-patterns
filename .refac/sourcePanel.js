import React, { useEffect, useState, useCallback } from 'react'
import Highlighter from './sourceHighlighter'
import path from 'path'
import SourceCodePanelControls from './sourcePanel.controls'
import { stateToIcon } from './stateToIcon'
import './sourcePanel.css'
import ReactMarkdown from 'react-markdown/with-html'
import { matchPathToFile } from '.'

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
        <div key={file + version} className="fileExplanation">
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
