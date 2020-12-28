import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../services/authContext'
import userApi from '../api/user'

import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import NewUserForm from '../components/NewUserForm'

const completeSignInPage = ({ history }) => {
  const { setUnfinishedProfile } = useContext(AuthContext)

  const [isEmailSignin, setIsEmailSignin] = useState(true)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState()
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'))
    window.localStorage.removeItem('emailForSignIn')
    completeSignInWithEmailLink()
  }, [])

  useEffect(() => {
    if (email && isEmailSignin) signInWithEmail()
  }, [email])

  const signInWithEmail = async () => {
    try {
      const result = await firebase.auth().signInWithEmailLink(email, window.location.href)
      if (!result.additionalUserInfo.isNewUser) {
        history.push('/profile')
      } else {
        setUnfinishedProfile(true)
        await userApi.postUser(JSON.stringify({ email, unfinishedProfile: true }))
        // TODO: replace with enforcing modal?
        setIsNewUser(result.additionalUserInfo.isNewUser)
      }
    } catch (error) {
      console.error(error)
      if (error.message) setError(error.message)
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }

  const completeSignInWithEmailLink = async () => {
    try {
      setIsEmailSignin(firebase.auth().isSignInWithEmailLink(window.location.href))

      if (email) {
        await signInWithEmail(email)
      }
    } catch (error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
      console.log(error.code, error.message)
      setError(error.message)
      return null
    }
  }

  const pageDetails = () => {
    if (!isEmailSignin) return <div>Nothing to see here...</div>

    if (error) return <div>ERROR: {error}</div>

    if (isNewUser) return <NewUserForm email={email} />

    if (!email)
      return (
        <>
          <h2>Please provide email for confirmation</h2>
          <EmailForm onSubmit={setEmail} />
        </>
      )

    return null
  }

  return <Layout>{pageDetails()}</Layout>
}

export default completeSignInPage
