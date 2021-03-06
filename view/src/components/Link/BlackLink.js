import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'
import { Link } from 'react-router-dom'

export const BlackLink = ({ to, children }) => (
  <Link to={to} css={[tw`text-gray-700 hover:text-gray-900 font-semibold pb-2 text-sm hocus:underline`]}>
    {children}
  </Link>
)
