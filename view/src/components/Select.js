import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import 'twin.macro'

const Select = ({ id, label, name, options, onChange, disabled }) => {
  return (
    <div tw="block">
      <label htmlFor={id} tw="inline-flex items-center text-lg">
        {label}
      </label>
      <select
        name={name}
        id={id}
        tw="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 pr-10"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
