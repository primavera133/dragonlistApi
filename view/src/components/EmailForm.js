import React, { useEffect, useState } from 'react'

import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { isEmail } from '../utils/isEmail'

const EmailForm = ({ onSubmit, buttonText = 'Confirm' }) => {
  const [formDisabled, setFormDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setFormDisabled(!validateForm())
  }, [email])

  const validateForm = () => {
    return !!email.length && isEmail(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <>
      <form tw="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <TextInput
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={(v) => setEmail(v)}
            errorMessage={errorMessage}
          />
        </div>
        <div>
          <Button isPrimary type="submit" disabled={formDisabled}>
            {buttonText}
          </Button>
        </div>
      </form>
    </>
  )
}

export default EmailForm
