import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import 'twin.macro'

const PasswordInput = ({ id, label, name, value, placeholder, onChange }) => (
  <label htmlFor={id} tw="block  text-lg">
    <span tw="text-gray-900">{label}</span>
    <input
      tw="mt-1 px-4 py-2 block w-full rounded border-gray-300 border"
      type="password"
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
)

export default PasswordInput
