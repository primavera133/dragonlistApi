import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../services/authContext'
import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import { isEmail } from '../utils/isEmail'

const signInEmailPage = ({ history }) => {
  const { authUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [trouble, setTrouble] = useState(false)

  useEffect(() => {
    if (email.length && isEmail(email)) sendEmail()
  }, [email])

  const sendEmail = async () => {
    try {
      const actionCodeSettings = {
        url: `${process.env.REACT_APP_BASE_URL}/completeSignin`,
        handleCodeInApp: true,
      }
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      setSuccess(true)
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email)
    } catch (error) {
      // Some error occurred, you can inspect the code: error.code
    }
  }

  if (!!authUser) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <Layout>
      <h1>Sign in with email</h1>
      <EmailForm onSubmit={setEmail} buttonText={'Next'} />
      {success && (
        <>
          <div>
            <p>
              A sign-in email with additional instructions was sent to {email}. Check your inbox to complete sign-in.
            </p>
          </div>
          <div>
            <h3 onClick={() => setTrouble(true)}>Trouble getting email?</h3>
            {trouble && (
              <p>
                <h4>Try these common fixes:</h4>
                <ul>
                  <li>Check if the email was marked as spam or filtered. Check your internet connection.</li>
                  <li>Check that you did not misspell your email.</li>
                  <li>
                    Check that your inbox space is not running out or other inbox settings related issues. If the steps
                    above didn't work, you can resend the email. Note that this will deactivate the link in the older
                    email.
                  </li>
                </ul>
              </p>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}

export default signInEmailPage
