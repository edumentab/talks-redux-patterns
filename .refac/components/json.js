import React from 'react'

export const Json = props => {
  const { json } = props
  return <pre>{JSON.stringify(json, null, 2)}</pre>
}
