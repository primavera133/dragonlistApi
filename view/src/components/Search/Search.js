import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
// import tw, { styled } from 'twin.macro'
import './search.scss'

export const Search = ({ label, names, onSelect }) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (inVal) => {
    const inputMatcher = new RegExp(inVal.trim().toLowerCase(), 'g')
    const inputLength = inVal.trim().length

    return inputLength === 0
      ? []
      : names.filter(([key, name]) => {
          return name.toLowerCase().match(inputMatcher)
        })
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => {
    onSelect(suggestion[0])
    return suggestion[1]
  }

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => {
    return <div>{suggestion[1]}</div>
  }

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Search',
    value,
    onChange,
  }

  return (
    <div tw="relative flex">
      <label tw="flex flex-col container">
        <span className="search_label">{label}</span>
        <Autosuggest
          id="search"
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </label>
    </div>
  )
}
