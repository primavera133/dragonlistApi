import React, { useEffect, useState } from 'react'
import { firebaseApp } from '../firebase'

import userApi from '../api/user'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [authUserLoading, setAuthUserLoading] = useState(true)
  const [loginFailed, setLoginFailed] = useState(false)
  const [unfinishedProfile, setUnfinishedProfile] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(async (authUser) => {
      setAuthUser(authUser)
      setLoginFailed(!authUser)
      if (!!authUser) {
        try {
          const ud = await userApi.getUser()
          setUserDetails(ud?.userCredentials)
          setUnfinishedProfile(!!ud?.userCredentials?.unfinishedProfile)
        } catch (error) {
          // console.log(error)
        }
      }
      setAuthUserLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ authUserLoading, authUser, loginFailed, userDetails, unfinishedProfile, setUnfinishedProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
