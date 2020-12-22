import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useContext } from 'react'
import firebase from 'firebase/app'
import { FirebaseAuth } from 'react-firebaseui'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../services/authContext'
import Layout from '../components/Layout'

const signInPage = ({ history }) => {
  const { authUser } = useContext(AuthContext)

  const signInSuccess = ({ ...rest }) => {
    console.log('signInSuccess', rest)
    history.push('/profile')
  }

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess,
    },
  }

  return !!authUser ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <Layout>
      <p>Sign In</p>
      <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Layout>
  )
}

export default signInPage
