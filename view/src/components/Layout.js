import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import Navbar from './Navbar.js'
import Footer from './Footer.js'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main tw="mt-8 container relative mx-auto">
        <div css={[tw`flex flex-col min-h-full mx-4 mb-24 md:mb-64`]}>
          <div tw="flex flex-col justify-center h-full space-y-5">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
// export default Layout
export default Layout
