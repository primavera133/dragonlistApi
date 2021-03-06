import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'
import { Link } from 'react-router-dom'

export const LinkComponent = ({ to, children }) => (
  <Link to={to} css={[tw`underline text-blue-600 hover:text-blue-800 visited:text-purple-600`]}>
    {children}
  </Link>
)
