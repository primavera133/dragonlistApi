import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'
import { Link } from 'react-router-dom'

export default ({ href, children, target = '_blank' }) => (
  <a
    href={href}
    css={[tw`underline text-blue-600 hover:text-blue-800 visited:text-purple-600`]}
    target={target}
    rel="noreferrer noopener"
  >
    {children}
  </a>
)
