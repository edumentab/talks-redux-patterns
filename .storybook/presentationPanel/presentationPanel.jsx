import React, { useEffect, useState, useCallback } from 'react'
import { Markdown } from '../../.refac/components/markdown'
import './presentationPanel.css'
import { useAddonState } from '@storybook/api'
import { ButtonGroup, Button } from '@blueprintjs/core'

const firstPage = `<img src="/reduxbook.png" data-presentation-link="slides" />`
const lastPage = `<img src="/bye.gif" data-presentation-link="slides" />

* [https://redux-patterns.netlify.com](https://redux-patterns.netlify.com)
* [https://github.com/edumentab/talks-redux-patterns](https://github.com/edumentab/talks-redux-patterns)
* [https://blog.krawaller.se/](https://blog.krawaller.se/)
* [https://edument.se/](https://edument.se/)
* [david@krawaller.se](mailto:david@krawaller.se)
`

export const Panel = props => {
  const { sourceData, brain } = props
  const [codeState, setCodeState] = useState(brain.getState().code)
  const [presentationState, setPresentationState] = useAddonState(
    'code-presentaiton',
    'splash'
  )
  brain.subscribe(d => setTimeout(() => setCodeState(d.code)))

  // useEffect(() => {
  //   document.body.addEventListener(
  //     'keydown',
  //     e => e.key === 'q' && toggleFullScreen()
  //   )
  // }, [])
  if (!codeState || !sourceData || !sourceData.presentation) return null
  const content =
    presentationState === 'splash'
      ? firstPage
      : presentationState === 'bye' || presentationState === null
      ? lastPage
      : sourceData.presentation[codeState.version]
  const handleImgClick = e => {
    const presLink = e.target.getAttribute('data-presentation-link')
    if (presLink !== presentationState) {
      setPresentationState(presLink)
    }
  }
  const handleBtnClick = () => {
    setPresentationState('bye')
  }
  if (!props.active || !content) return null
  return (
    <div className="presentationPanel bp3-ui-text" onClick={handleImgClick}>
      <Markdown
        key={content}
        onLinkClick={brain.clickLink}
        markdown={content}
      />
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
      {codeState.version === 'v11' && presentationState === 'slides' && (
        <div style={{ paddingTop: '10px' }}>
          <Button onClick={handleBtnClick} text="Bye!" />
        </div>
      )}
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
