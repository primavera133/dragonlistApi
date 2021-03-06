import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useRef } from 'react'
import 'twin.macro'
import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'

let previousValidValue

export const Select = withI18n()(({ disabled, id, label, name, options, onChange, selected, i18n }) => {
  const ref = useRef()
  const handleChange = (e) => {
    const value = e.target.value
    if (value) {
      onChange(value)
      previousValidValue = e.target.value
    } else {
      ref.current.value = previousValidValue
    }
  }
  return (
    <div tw="block">
      <label htmlFor={id} tw="inline-flex items-center text-lg">
        {label}
      </label>
      <select
        name={name}
        id={id}
        tw="block w-full mt-1 rounded-md border-gray-300 border shadow-sm focus:outline-none focus:ring focus:border-blue-300 p-3 pr-10"
        onChange={handleChange}
        disabled={disabled}
        value={selected}
        ref={ref}
      >
        <option value="" key="_select_">
          {i18n._(t`-- select ---`)}
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
})

// export default withI18n()(Select)
