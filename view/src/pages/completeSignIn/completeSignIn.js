import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import tw, { css } from 'twin.macro'

import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'

import { AuthContext } from '../../services/authContext'
import userApi from '../../api/user'

import Layout from '../../components/Layout/Layout'
import EmailForm from '../../components/EmailForm/EmailForm'
import PageHeader from '../../components/PageHeader/PageHeader'
import Loader from '../../components/Loader/Loader'

const completeSignInPage = ({ history, i18n }) => {
  const { authUser, authUserLoading, userDetails, unfinishedProfile, setUnfinishedProfile } = useContext(AuthContext)

  const [isEmailSignin, setIsEmailSignin] = useState(true)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState()
  const [isNewUser, setIsNewUser] = useState(false)
  // const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'))
    window.localStorage.removeItem('emailForSignIn')
    completeSignInWithEmailLink()
  }, [])

  useEffect(() => {
    if (!authUser && email && isEmailSignin) signInWithEmail()
  }, [email, authUser, isEmailSignin])

  // Take care of page reload
  useEffect(() => {
    if (!!authUser && !!userDetails) {
      if (unfinishedProfile) {
        setEmail(authUser.email)
        setIsNewUser(true)
        // setIsComplete(false)
      } else {
        setIsNewUser(false)
        // setIsComplete(true)
      }
    }
  }, [userDetails, unfinishedProfile, authUser])

  const completeSignInWithEmailLink = async () => {
    try {
      firebase.auth().isSignInWithEmailLink(window.location.href) ? setIsEmailSignin(true) : history.push('/test-error')

      if (email) {
        await signInWithEmail()
      }
    } catch (error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      console.log(error.code, error.message)
      setError(error.message)
      return null
    }
  }

  const signInWithEmail = async () => {
    try {
      const result = await firebase.auth().signInWithEmailLink(email, window.location.href)
      if (!result.additionalUserInfo.isNewUser) {
        history.push('/profile')
      } else {
        await userApi.postUser(JSON.stringify({ email, unfinishedProfile: true }))
        setUnfinishedProfile(true)
        console.log('signIn complete')
        history.push('/profile')

        // setIsNewUser(result.additionalUserInfo.isNewUser)
      }
    } catch (error) {
      console.error(error)
      if (error.message) setError(error.message)
    }
  }

  const pageDetails = () => {
    if (authUserLoading) return <Loader />

    if (!isEmailSignin)
      return (
        <div>
          <Trans>Nothing to see here.</Trans>
        </div>
      )

    if (error) return <div>ERROR: {error}</div>

    if (!email)
      return (
        <>
          <PageHeader>
            <Trans>Complete sign in</Trans>
          </PageHeader>
          <h2 css={[tw`text-black font-semibold text-xl lg:text-xl mb-4`]}>
            <Trans>Please provide email for confirmation</Trans>
          </h2>
          <EmailForm onSubmit={setEmail} buttonText={i18n._(t`Complete`)} />
        </>
      )

    return null
  }

  return (
    <Layout>
      <div tw="max-w-md">{pageDetails()}</div>
    </Layout>
  )
}

export default withI18n()(completeSignInPage)
