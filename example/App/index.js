import React from 'react'

import ReactAwesomeFilter from '../../lib'

const GENERATORS = [
  (str) => {
    if (str.toLowerCase().indexOf('size') === -1) {
      return null
    }

    const num = +((str.match(/\d+/) || [])[0]) || 0
    const op = str.indexOf('>') > -1 ? 'gt' : (str.indexOf('<') > -1 ? 'lt' : 'eq')

    return { type: 'size', meta: { op: op, value: num } }
  },
  (str) => ({ type: 'name', meta: str }),
]

const HIGHLIHGTS = {
  'size': ({ meta }) => `Size ${meta.op} ${meta.value}`,
  'name': ({ meta }) => `Search for "${meta}" in name`,
}

const LABELS = {
  'size': ({ meta }) => `Size ${meta.op} ${meta.value}`,
  'name': ({ meta }) => `Search for "${meta}" in name`,
}

const QUERY  = {
  'size': ({ meta }) => `size ${meta.op === 'gt' ? '>' : '<'} ${meta.value}`,
  'name': ({ meta }) => `name LIKE "%${meta}%"`,
}

export default class App extends React.PureComponent {
  state = { value: [] }
  setValue = (value) => this.setState({ value })

  getQuery = () => this.state.value.reduce((acc, item) => `${acc ? `${acc} AND ` : ''}${QUERY[item.type](item)}`, '')

  render () {
    const { value } = this.state

    return (
      <div style={{ padding: 30 }}>
        <h1>React Awesome Filter</h1>
        <p>Yet another react filtering component</p>
        <div style={{ }}>
          <ReactAwesomeFilter
            value={value}
            generators={GENERATORS}
            highlights={HIGHLIHGTS}
            labels={LABELS}
            onChange={this.setValue}
          />
        </div>
        <div>
          Query: <code>SELECT * FROM table {this.getQuery() !== '' ? `WHERE ${this.getQuery()}` : ''};</code>
        </div>
      </div>
    )
  }
}