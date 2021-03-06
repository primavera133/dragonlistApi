import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main tw="mt-8 container relative mx-auto">
        <div tw="grid grid-cols-1 md:grid-cols-3 flex-grow mx-4 mb-24 md:mb-64">
          <div tw="col-span-1 md:col-span-2 flex flex-col justify-center h-full space-y-5">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
