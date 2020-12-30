import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'
import { Link } from 'react-router-dom'

export default ({ href, children, target = '_blank' }) => (
  <a
    href={href}
    css={[tw`text-gray-700 hover:text-gray-900 font-semibold pb-2 text-sm hocus:underline`]}
    target={target}
    rel="noreferrer noopener"
  >
    {children}
  </a>
)
