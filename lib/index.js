import React from 'react'

const styling = `
  .input-with-dropdown { position: relative; font-weight: 300; }
  .input-with-dropdown__input { border: none; height: 24px; }
  .input-with-dropdown__input:focus { outline: none; }
  .input-with-dropdown__body { position: absolute; display: none; top: 30px; z-index: 100; min-width: 200px; border-radius: 5px; overflow: hidden; box-shadow: 0 0 5px 0px rgba(0, 0, 0, .1) }
  .input-with-dropdown__body.visible { display: block; }
  .input-with-dropdown__item { padding: 6px 12px; background: white; cursor: pointer; user-select: none; }
  .input-with-dropdown__item:hover { background: #fafafa; }
  .input-with-dropdown__item.selected { background: #fafafa; }
`

const Bar = (props) => (
  <div
    style={{ display: 'flex', padding: '12px', background: 'white', border: 'none', borderRadius: 5, boxShadow: '0 0 3px 0px rgba(0, 0, 0, .1)' }}
    {...props}
  />
)

const Tag = ({ color, ...props }) => (
  <div
    style={{ background: color || '#069', color: 'white', padding: '5px 8px', borderRadius: '3px', fontWeight: 'bold', fontSize: 13, marginRight: 8 }}
    {...props}
  />
)

class InputWithDropdown extends React.PureComponent {
  state = { value: '', highlights: [], focused: false, index: null }
  setValue = (value) => this.setState({ value }, this.postChange)
  setIndex = (index) => this.setState({ index })

  postChange = () => {
    /* Ask for highlights */
    Promise.resolve(this.props.getHighlights(this.state.value)).then((highlights) => {
      this.setState({ highlights })
    })
  }

  handleFocus = () => {
    this.setState({ focused: true })
  }

  handleBlur = () => {
    setTimeout(() => {
      this.setState({ focused: false })
    }, 300)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      this.setState((state) => ({
        index: Math.min(state.highlights.length - 1, Math.max(0, state.index === null ? 0 : state.index + 1))
      }))
      e.preventDefault()
    } else if (e.keyCode === 38) {
      this.setState((state) => ({
        index: Math.min(state.highlights.length - 1, Math.max(0, state.index === null ? state.highlights.length - 1 : state.index - 1))
      }))
      e.preventDefault()
    } else if (e.keyCode === 13) {
      this.pickHighlight(this.state.index) // TODO by index?
      e.preventDefault()
    }
  }

  pickHighlight = (index) => {
    /* Commit result here */
    const highlight = this.state.highlights[index]

    this.setState({ value: '', highlights: [] })
    this.props.onAdd(highlight)
  }

  render () {
    const { value, focused, highlights, index } = this.state

    return (
      <div className="input-with-dropdown">
        <input
          value={value}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          className="input-with-dropdown__input"
          onChange={(e) => this.setValue(e.target.value || '')}
        />

        <div className={`input-with-dropdown__body ${focused && highlights.length > 0 ? 'visible' : ''}`}>
          {highlights.map((item, i) => (
            <div
              key={i}
              onClick={() => this.pickHighlight(i)}
              className={`input-with-dropdown__item ${i === index ? 'selected' : ''}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default class Filter extends React.PureComponent {
  getHighlights = (str) => {
    const items = this.props.generators.map((f) => f(str)).filter((v) => !!v)

    return items.map((item) => ({ value: item, label: this.props.highlights[item.type](item) }))
  }

  addFilter = (filter) => {
    // const item = filter.value
    // const

    this.props.onChange(this.props.value.concat([filter.value]))
  }

  render () {
    const { value } = this.props

    return (
      <Bar>
        <style>{styling}</style>
        {value.map((item, index) => (
          <Tag key={index}>{this.props.labels[item.type](item)}</Tag>
        ))}

        <InputWithDropdown
          getHighlights={this.getHighlights}
          onAdd={this.addFilter}
        />
      </Bar>
    )
  }
}