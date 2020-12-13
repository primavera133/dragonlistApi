import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import auth from '../api/auth'

const homePage = ({ history }) => {
  return (
    <div>
      <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
        <div tw="flex flex-col justify-center h-full space-y-5">HOME</div>
      </div>
    </div>
  )
}

export default homePage
