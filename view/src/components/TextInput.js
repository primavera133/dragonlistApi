import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import 'twin.macro'

const TextInput = ({ id, label, name, value, placeholder, onChange, disabled, errorMessage }) => (
  <>
    <label htmlFor={id} tw="block text-lg mb-4">
      <span tw="text-gray-900">{label}</span>
      <input
        tw="mt-1 px-4 py-2 block w-full rounded border-gray-300 border focus:outline-none focus:ring focus:border-blue-300"
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
    {errorMessage && <span>{errorMessage}</span>}
  </>
)

export default TextInput
