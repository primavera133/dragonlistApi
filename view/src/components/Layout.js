import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro'
import { logout } from '../service/authService'

const Layout = ({ children }) => {
  return (
    <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
      <nav>
        <NavLink
          exact
          activeStyle={{
            fontWeight: 'bold',
          }}
          to={`/`}
        >
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink
          exact
          activeStyle={{
            fontWeight: 'bold',
          }}
          to={`/login`}
        >
          Login
        </NavLink>{' '}
        |{' '}
        <NavLink
          exact
          activeStyle={{
            fontWeight: 'bold',
          }}
          to={`/signup`}
        >
          Signup
        </NavLink>{' '}
        |{' '}
        <NavLink
          exact
          activeStyle={{
            fontWeight: 'bold',
          }}
          to={`/profile`}
        >
          Profile
        </NavLink>{' '}
        |{' '}
        <a onClick={() => logout()} style={{ cursor: 'pointer' }}>
          Log out
        </a>
      </nav>
      <div tw="flex flex-col justify-center h-full space-y-5">{children}</div>
    </div>
  )
}
export default Layout
