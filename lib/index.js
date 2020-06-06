import React from 'react'

import FilterBar from './components/FilterBar'
import OptionTag from './components/OptionTag'
import FilterInput from './components/FilterInput'

/**
 * React Awesome Filter component
 */
export default class Filter extends React.PureComponent {
  state = { inputValue: '', options: [] }

  setInputValue = (inputValue) => this.setState({ inputValue }, this.rebuildOptions)

  /* Main method to generate options for string */
  rebuildOptions = () => {
    const options = this.props.optionsGenerators.map((generator) => (this.props.inputValue)).filter((v) => !!v)

    this.setState({ options })
  }

  /**
   * Main method to add filter to value
   *
   */
  addNewOption = (option /* { type, meta } */) => {
    /* Trigger parent's onChange method with new collection of filters */
    this.props.onChange(this.props.value.concat([ option ]))
  }

  /**
   * Processing removal icon clicks on Tags
   */
  removeOption = (index) => {
    /* Trigger parent's onChange method with new collection of filters */
    this.props.onChange(this.props.filter((_, i) => i !== index))
  }

  /* Few simple helpers for labels and options */

  getLabel = (option) => {
    return this.props.config[option.type].label(option)
  }

  getOptionLabel = (option) => {
    return (
      this.props.config[option.type].optionLabel
      || this.props.config[option.type].label
    )(option)
  }

  render () {
    return (
      <FilterBar>
        {this.props.value.map((option, index) => (
          <OptionTag
            key={index}
            label={this.getLabel(option)}
            onRemove={() => this.removeOption(index)}
          />
        ))}

        <FilterInput
          value={this.state.inputValue}
          onChange={this.setInputValue}
          options={this.state.options}
          labelMapper={this.getOptionLabel}
          onSubmit={this.addNewOption}
        />
      </FilterBar>
    )
  }
}