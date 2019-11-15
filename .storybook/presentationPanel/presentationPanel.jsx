import React, { useEffect, useState } from 'react'
import { Markdown } from '../../.refac/components/markdown'
import './presentationPanel.css'
import { useAddonState } from '@storybook/api'
import { ButtonGroup, Button } from '@blueprintjs/core'

export const PanelF = ({ active }) => (active ? <h1>Hello!</h1> : null)

export const Panel = props => {
  const { sourceData, brain } = props
  const [codeState, setCodeState] = useState(brain.getState().code)
  brain.subscribe(d => setTimeout(() => setCodeState(d.code)))

  console.log('CODESTATE', codeState)
  // useEffect(() => {
  //   document.body.addEventListener(
  //     'keydown',
  //     e => e.key === 'q' && toggleFullScreen()
  //   )
  // }, [])
  if (!codeState || !sourceData || !sourceData.presentation) return null
  const content = sourceData.presentation[codeState.version]
  if (!props.active || !content) return null
  return (
    <div className="presentationPanel bp3-ui-text">
      <Markdown onLinkClick={brain.clickLink} markdown={content} />
      {/* <div style={{ transform: 'scale(0.7, 0.7)', transformOrigin: 'left' }}>
        <ButtonGroup>
          {pages.map(([title], n) => (
            <Button
              key={n}
              onClick={() => setPage(n)}
              active={n === page}
              text={title}
            />
          ))}
        </ButtonGroup>
      </div>
      <div className="pageContent">
        <Page />
      </div> */}
    </div>
  )
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
