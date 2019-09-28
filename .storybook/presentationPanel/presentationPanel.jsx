import React from 'react'

import './presentationPanel.css'

export const Panel = props => {
  if (!props.active) return null
  return <div className="presentationPanel">WOO!</div>
}
