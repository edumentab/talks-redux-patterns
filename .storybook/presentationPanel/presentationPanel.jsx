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
  const { sourceData, brain, goToPanel } = props
  const [codeState, setCodeState] = useState(brain.getState().code)
  const [presentationState, setPresentationState] = useAddonState(
    'code-presentaiton',
    'splash'
  )
  useEffect(() => {
    const fn = d => setCodeState(d.code)
    brain.subscribe(fn)
    return () => brain.unsubscribe(fn)
  })

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
      : presentationState === 'bye'
      ? lastPage
      : sourceData.presentation[codeState.version]
  const curVersionIdx = sourceData.versions.findIndex(
    v => v === codeState.version
  )
  const handleImgClick = e => {
    const presLink = e.target.getAttribute('data-presentation-link')
    if (presLink && presLink !== presentationState) {
      setPresentationState(presLink)
    }
  }
  const leftBtn = curVersionIdx ? (
    <Button
      onClick={() => brain.clickLink(sourceData.versions[curVersionIdx - 1])}
      text="Previous"
    />
  ) : (
    <Button onClick={() => setPresentationState('splash')} text="Hello!" />
  )
  const rightBtn =
    curVersionIdx === sourceData.versions.length - 1 ? (
      <Button onClick={() => setPresentationState('bye')} text="Bye!" />
    ) : (
      <Button
        onClick={() => brain.clickLink(sourceData.versions[curVersionIdx + 1])}
        text="Next"
      />
    )
  const handleLinkClick = link => {
    if (!sourceData.versions.includes(link)) {
      goToPanel('sourceCode')
    }
    brain.clickLink(link)
  }
  if (!props.active || !content) return null

  return (
    <div className="presentationPanel bp3-ui-text" onClick={handleImgClick}>
      {presentationState === 'slides' && (
        <div className="presentationBtnContainer">
          {leftBtn}
          {rightBtn}
        </div>
      )}
      <Markdown
        key={content}
        onLinkClick={handleLinkClick}
        markdown={content}
      />
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
