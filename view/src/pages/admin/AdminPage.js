import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw from 'twin.macro'

export const AdminPage = ({ history }) => {
  return (
    <div>
      <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
        <div tw="flex flex-col justify-center h-full space-y-5">ADMIN</div>
      </div>
    </div>
  )
}
