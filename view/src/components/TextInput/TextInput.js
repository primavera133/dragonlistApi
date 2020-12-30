import { jsx } from '@emotion/react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
/** @jsxImportSource @emotion/react */

import React from 'react'
import 'twin.macro'

const TextInput = ({
  id,
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled,
  errorMessage,
  subText,
  supText,
}) => (
  <div tw="mb-4">
    <label htmlFor={id} tw="block text-lg mb-2">
      <span tw="text-gray-900">{label}</span>
      {supText && (
        <span tw="block text-sm">
          <FontAwesomeIcon icon={faInfoCircle} tw="mr-2  text-gray-500" />
          {supText}
        </span>
      )}
      <input
        tw="mt-1 px-4 py-2 block w-full rounded border-gray-300 border focus:outline-none focus:ring focus:border-blue-300 disabled:text-gray-500"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
    {errorMessage && <span tw="block">{errorMessage}</span>}
    {subText && (
      <span tw="block text-sm">
        <FontAwesomeIcon icon={faInfoCircle} tw="mr-2 text-gray-500" />
        {subText}
      </span>
    )}
  </div>
)

export default TextInput
