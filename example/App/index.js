import React from 'react'

import ReactAwesomeFilter from '../../lib'

export default class App extends React.PureComponent {
  render () {
    return (
      <div>
        Basic Example:
        <div style={{ padding: 20 }}>
          <ReactAwesomeFilter />
        </div>
      </div>
    )
  }
}