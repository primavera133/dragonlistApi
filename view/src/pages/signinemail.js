import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useContext, useEffect } from 'react'
import tw from 'twin.macro'
import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../services/authContext'
import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import { isEmail } from '../utils/isEmail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../components/PageHeader'

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
      <div tw="max-w-md">
        <PageHeader>Sign in with email</PageHeader>
        <p>
          Dragonlist uses links-by-email to sign in. Enter your email address in the form below and we will send you a
          link that you can use to sign in.
        </p>
        <p tw="mb-8">
          If it's your first time signing in we will ask you a few additional questions to complete your profile.
        </p>
        <EmailForm
          onSubmit={(v) => {
            setSuccess(false)
            setEmail(v)
          }}
          buttonText={'Next'}
        />
        {success && (
          <>
            <div tw="my-8">
              <p>
                A sign-in email with additional instructions was sent to {email}. Check your inbox to complete sign-in.
              </p>
            </div>
            <div>
              <button
                onClick={() => setTrouble(true)}
                tw="cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
              >
                <FontAwesomeIcon icon={faQuestionCircle} tw="mr-2 text-gray-800" />
                <span tw="text-xl font-semibold">Trouble getting email?</span>
              </button>
              {trouble && (
                <p>
                  <h4>Try these common fixes:</h4>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      Check if the email was marked as spam or filtered.{' '}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" /> Check your internet connection.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      Check that you did not misspell your email.
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      Check that your inbox space is not running out or other inbox settings related issues.
                    </li>
                    <li tw="mt-2">
                      If the steps above didn't work, you can resend the email. Note that this will deactivate the link
                      in the older email.
                    </li>
                  </ul>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default signInEmailPage
