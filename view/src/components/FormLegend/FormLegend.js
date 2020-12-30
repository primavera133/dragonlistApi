import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { css } from 'twin.macro'

export default ({ children }) => (
  <legend css={[tw`text-black font-semibold text-xl lg:text-2xl mb-4`]}>{children}</legend>
)
