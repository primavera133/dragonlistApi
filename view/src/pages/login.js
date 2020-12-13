import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import * as AuthService from '../service/AuthService'
import auth from '../api/auth'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'

const loginPage = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formDisabled, setFormDisabled] = useState(true)

  const validateForm = () => {
    return !!(email.length && password.length)
  }

  const onUpdate = (field, value) => {
    switch (field) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
    }
    setFormDisabled(!validateForm())
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!validateForm()) return

      const token = await auth.postLogin({
        email,
        password,
      })
      AuthService.login(token)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
        <div tw="flex flex-col justify-center h-full space-y-5">
          <form tw="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
            <TextInput id="email" name="email" label="Email" value={email} onChange={(v) => onUpdate('email', v)} />
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={(v) => onUpdate('password', v)}
            />
            <Button isPrimary type="submit" disabled={formDisabled}>
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default loginPage
