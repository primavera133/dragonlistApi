import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import tw, { css } from 'twin.macro'

import { detectLanguage } from '../../i18n'

const setLanguage = (value) => {
  window.localStorage.setItem('lang', value)
  window.location.reload()
}

const Language = ({ transparent }) => {
  const [lang, setLang] = useState()
  useEffect(() => {
    setLang(detectLanguage())
  }, [])
  return (
    <ul tw="mx-4 text-black" css={[transparent && tw`text-white`]}>
      <li tw="inline">
        {lang === 'sv' && <span tw="font-bold">SV</span>}
        {lang !== 'sv' && (
          <a onClick={() => setLanguage('sv')} tw="cursor-pointer">
            SV
          </a>
        )}
      </li>
      <li tw="inline"> / </li>
      <li tw="inline">
        {lang === 'en' && <span tw="font-bold">EN</span>}
        {lang !== 'en' && (
          <a onClick={() => setLanguage('en')} tw="cursor-pointer">
            EN
          </a>
        )}
      </li>
    </ul>
  )
}

export default Language
