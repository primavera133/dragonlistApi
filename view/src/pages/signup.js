import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'

import * as authService from '../service/authService'
import authApi from '../api/auth'
import TextInput from '../components/TextInput'
import Checkbox from '../components/Checkbox'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import Layout from '../components/Layout'

const loginPage = ({ history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phonePublic, setPhonePublic] = useState(false)
  const [email, setEmail] = useState('')
  const [emailPublic, setEmailPublic] = useState(false)
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [formDisabled, setFormDisabled] = useState(true)

  const validateForm = () => {
    return !!(
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
        <div>
          <TextInput
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName}
            onChange={(v) => onUpdate(setFirstName, v)}
          />
        </div>
        <div>
          <TextInput
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={(v) => onUpdate(setLastName, v)}
          />
        </div>
        <div>
          <TextInput
            id="country"
            name="country"
            label="Country"
            value={country}
            onChange={(v) => onUpdate(setCountry, v)}
          />
        </div>
        <div>
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            value={phoneNumber}
            onChange={(v) => onUpdate(setPhoneNumber, v)}
          />
          <Checkbox
            id="phonePublic"
            name="phonePublic"
            label="Display public"
            value={phonePublic}
            onChange={(v) => onUpdate(setPhonePublic, v)}
          />
        </div>
        <div>
          <TextInput id="email" name="email" label="Email" value={email} onChange={(v) => onUpdate(setEmail, v)} />
          <Checkbox
            id="emailPublic"
            name="emailPublic"
            label="Display public"
            value={emailPublic}
            onChange={(v) => onUpdate(setPhonePublic, v)}
          />
        </div>
        <div>
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={(v) => onUpdate(setPassword, v)}
          />
        </div>
        <div>
          <Button isPrimary type="submit" disabled={formDisabled}>
            Sign up
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default loginPage
