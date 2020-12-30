import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import 'twin.macro'

const Radio = ({ id, label, name, value, onChange, disabled }) => (
  <div tw="block mt-2">
    <label htmlFor={id} tw="inline-flex items-center text-lg">
      <input
        disabled={disabled}
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        tw="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
        type="radio"
        value={value}
      />
      <span tw="text-gray-900">{label}</span>
    </label>
  </div>
)

export default Radio
