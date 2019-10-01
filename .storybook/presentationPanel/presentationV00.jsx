import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV00 = () => {
  return (
    <div>
      <img
        onClick={toggleFullScreen}
        style={{ maxWidth: '100%' }}
        src="/reduxbook.png"
      />
      <ReactMarkdown
        source={`

`}
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
