import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro'
import Navigation from './Navigation'
import { logout } from '../services/authService'

const Layout = ({ children }) => {
  return (
    <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
      <Navigation />
      <div tw="flex flex-col justify-center h-full space-y-5">{children}</div>
    </div>
  )
}
export default Layout
