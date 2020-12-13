import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw from 'twin.macro'

const profilePage = ({ history }) => {
  return (
    <div>
      <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
        <div tw="flex flex-col justify-center h-full space-y-5">PROFILE</div>
      </div>
    </div>
  )
}

export default profilePage
