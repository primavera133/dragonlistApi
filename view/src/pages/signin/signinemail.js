import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useContext, useEffect } from 'react'
import tw from 'twin.macro'
import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/macro'

import { AuthContext } from '../../services/authContext'
import { isEmail } from '../../utils/isEmail'

import Layout from '../../components/Layout/Layout'
import EmailForm from '../../components/EmailForm/EmailForm'
import PageHeader from '../../components/PageHeader/PageHeader'

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
        url: `${process.env.REACT_APP_BASE_URL}/completeSignIn`,
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
        <PageHeader>
          <Trans>Sign in with email</Trans>
        </PageHeader>
        <p>
          <Trans>
            Dragonlist uses links-by-email to sign in. Enter your email address in the form below and we will send you a
            link that you can use to sign in.
          </Trans>
        </p>
        <p tw="mb-8">
          <Trans>
            If it's your first time signing in we will ask you a few additional questions to complete your profile.
          </Trans>
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
                <Trans>
                  A sign-in email with additional instructions was sent to {email}. Check your inbox to complete
                  sign-in.
                </Trans>
              </p>
            </div>
            <div>
              <button
                onClick={() => setTrouble(true)}
                tw="cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
              >
                <FontAwesomeIcon icon={faQuestionCircle} tw="mr-2 text-gray-800" />
                <span tw="text-xl font-semibold">
                  <Trans>Trouble getting email?</Trans>
                </span>
              </button>
              {trouble && (
                <div tw="mt-4">
                  <h4>
                    <Trans>Try these common fixes:</Trans>
                  </h4>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      <Trans>Check if the email was marked as spam or filtered.</Trans>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      <Trans>Check your internet connection.</Trans>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      <Trans>Check that you did not misspell your email.</Trans>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheckSquare} tw="mr-2 text-gray-800" />
                      <Trans>
                        Check that your inbox space is not running out or other inbox settings related issues.
                      </Trans>
                    </li>
                    <li tw="mt-2">
                      <Trans>
                        If the steps above didn't work, you can resend the email. Note that this will deactivate the
                        link in the older email.
                      </Trans>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default signInEmailPage
