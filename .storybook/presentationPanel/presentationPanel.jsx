import React from 'react'

import './presentationPanel.css'
import { useAddonState } from '@storybook/api'
import { ButtonGroup, Button } from '@blueprintjs/core'

import { PresentationV01 } from './presentationV01'
import { PresentationV02 } from './presentationV02'
import { PresentationV03 } from './presentationV03'

const pages = [
  ['start', PresentationV01],
  ['immer', PresentationV02],
  ['gnorp', PresentationV03]
]

export const Panel = props => {
  const [page, setPage] = useAddonState('edumentab/presentation', 0)
  if (!props.active) return null
  const [title, Page] = pages[page]
  return (
    <div className="presentationPanel">
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
      <div className="pageContent">
        <Page />
      </div>
    </div>
  )
}
