import React from 'react';

/**
 *
 */
class InputWithDropdown extends React.PureComponent {
  /**
   *
   */
  state = { focused: false, index: 0 }
  setFocused = (focused) => this.setState({ focused })
  setIndex = (index) => this.setState({ index })

  /* */
  handleFocus = () => this.setState({ focused: true })
  handleBlur = () => setTimeout(() => this.setState({ focused: false }), 300)

  /**
   * Keyboard navigation and submitting
   */
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
      this.submitOption(this.state.index)
      e.preventDefault()
    }
  }

  /**
   * Main method for retrieving an option
   */
  submitOption = (index) => this.props.onSubmit(index)

  /**
   * Rendering stuff 
   */
  render () {
    const { value, options } = this.props
    const { focused, index } = this.state

    return (
      <div className="raf-input">
        <input
          className="raf-input__input"
          value={value}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          onChange={this.props.onChange}
        />

        <div className="raf-input__dropdown" style={{ display: focused && options.length > 0 ? 'block' : 'none' }}>
          {options.map((option, i) => (
            <div key={i} className={`raf-input__option ${index === i ? 'selected' : ''}`} onClick={() => this.submitOption(i)}>
              {this.props.labelMapper(option)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}