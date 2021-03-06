import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'

export const PageHeader = ({ children }) => (
  <h1 css={[tw`text-black font-semibold text-3xl lg:text-4xl mb-4`]}>{children}</h1>
)
