import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import tw from 'twin.macro'
import { useQuery } from 'react-query'

import * as authService from '../services/authService'
import authApi from '../api/auth'
import configApi from '../api/config'
import TextInput from '../components/TextInput'
import Checkbox from '../components/Checkbox'
import Select from '../components/Select'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import Layout from '../components/Layout'

const loginPage = ({ history }) => {
  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)

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
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <form tw="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
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
        {!isFetchingCountries && (
          <Select
            name="country"
            id="country"
            options={countries}
            label="Country"
            onChange={(v) => onUpdate(setCountry, v)}
          />
        )}

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={(v) => onUpdate(setPassword, v)}
        />
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
