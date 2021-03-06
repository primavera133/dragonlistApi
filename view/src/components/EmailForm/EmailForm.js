import React, { useEffect, useState } from 'react'
import { withI18n } from '@lingui/react'
import { t } from '@lingui/macro'

import TextInput from '../../components/TextInput/TextInput'
import { Button } from '../Button'
import { isEmail } from '../../utils/isEmail'

export const EmailForm = withI18n()(({ onSubmit, buttonText, i18n }) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="email"
          id="email"
          name="email"
          label={i18n._(t`Email`)}
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
  )
})
