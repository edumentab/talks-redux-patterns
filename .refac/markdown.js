import React, { useCallback } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import './markdown.css'

export const Markdown = props => {
  const { markdown, onLinkClick } = props
  const handleClick = useCallback(
    e => {
      const link = e.target
        .closest('[data-file-link]')
        .getAttribute('data-file-link')
      if (link) {
        onLinkClick(link)
      }
    },
    [onLinkClick]
  )
  return (
    <div onClick={handleClick}>
      <ReactMarkdown source={markdown} escapeHtml={false} />
    </div>
  )
}
