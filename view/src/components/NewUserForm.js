import React, { useEffect, useState } from 'react'

import userApi from '../api/user'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const NewUserForm = ({ email }) => {
  const [formDisabled, setFormDisabled] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    setFormDisabled(!validateForm())
  }, [firstName, lastName])

  const validateForm = () => {
    return !!(email.length && firstName.length && lastName.length)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await userApi.postUser(JSON.stringify({ email, firstName, lastName }))
    console.log('update successful')
  }

  return (
    <>
      <div>Welcome new user</div>
      <form tw="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <TextInput id="email" name="email" label="email" value={email} disabled />
          <TextInput
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName}
            onChange={(v) => setFirstName(v)}
          />
          <TextInput
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={(v) => setLastName(v)}
          />
        </div>
        <div>
          <Button isPrimary type="submit" disabled={formDisabled}>
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default NewUserForm
