import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import tw, { css } from 'twin.macro'

import { detectLanguage } from '../../i18n'

let language

const setLanguage = (value) => {
  window.localStorage.setItem('lang', value)
  window.location.reload()
}

export const getLanguage = () => {
  try {
    if (language) return language
    const storedLanguage = window.localStorage.getItem('lang')
    if (!storedLanguage) {
      language = detectLanguage()
      return setLanguage(language)
    }
    return storedLanguage
  } catch (err) {
    console.log(err)
    language = detectLanguage()
    return setLanguage(language)
  }
}

export const Language = ({ transparent }) => {
  const [lang, setLang] = useState()
  useEffect(() => {
    language = detectLanguage()
    setLang(language)
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
