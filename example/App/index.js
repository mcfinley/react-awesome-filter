import React from 'react'

import ReactAwesomeFilter from '../../lib'

const FILTERS = [
  (str) => {
    if (str.toLowerCase().indexOf('size') === -1) {
      return null
    }

    const num = +((str.match(/\d+/) || [])[0]) || 0

    return {
      value: { type: 'size-eq', num },
      label: `Size eq ${num}`,
    }
  },
  (str) => {
    return {
      value: { type: 'search', str },
      label: `Search for ${str}`,
    }
  },
]

export default class App extends React.PureComponent {
  state = { value: [] }
  setValue = (value) => this.setState({ value })

  render () {
    const { value } = this.state

    return (
      <div>
        Basic Example:
        <div style={{ padding: 20 }}>
          <ReactAwesomeFilter
            value={value}
            filters={FILTERS}
            onChange={this.setValue}
          />
        </div>
      </div>
    )
  }
}