import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import * as authService from '../service/authService'
import authApi from '../api/auth'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import Layout from '../components/Layout'

const loginPage = ({ history }) => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [formDisabled, setFormDisabled] = useState(true)

  const validateForm = () => {
    return !!(
      username.length &&
      email.length &&
      password.length &&
      firstName.length &&
      lastName.length &&
      phoneNumber.length &&
      country.length
    )
  }

  const onUpdate = (func, value) => {
    func(value)
    setFormDisabled(!validateForm())
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!validateForm()) return

      const { token, userData } = await authApi.postSignup({
        username,
        firstName,
        lastName,
        country,
        phoneNumber,
        email,
        password,
      })
      authService.login(token, userData.roles)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <form tw="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
        <TextInput
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={(v) => onUpdate(setUsername, v)}
        />
        <TextInput
          id="firstName"
          name="firstName"
          label="First name"
          value={firstName}
          onChange={(v) => onUpdate(setFirstName, v)}
        />
        <TextInput
          id="lastName"
          name="lastName"
          label="Last name"
          value={lastName}
          onChange={(v) => onUpdate(setLastName, v)}
        />
        <TextInput
          id="country"
          name="country"
          label="Country"
          value={country}
          onChange={(v) => onUpdate(setCountry, v)}
        />
        <TextInput
          id="phoneNumber"
          name="phoneNumber"
          label="Phone number"
          value={phoneNumber}
          onChange={(v) => onUpdate(setPhoneNumber, v)}
        />
        <TextInput id="email" name="email" label="Email" value={email} onChange={(v) => onUpdate(setEmail, v)} />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={(v) => onUpdate(setPassword, v)}
        />
        <Button isPrimary type="submit" disabled={formDisabled}>
          Log in
        </Button>
      </form>
    </Layout>
  )
}

export default loginPage
