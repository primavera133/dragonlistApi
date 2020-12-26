import React, { useEffect, useState } from 'react'
import { firebaseApp } from '../firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [loginFailed, setLoginFailed] = useState(false)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((authUser) => {
      setAuthUser(authUser)
      setLoginFailed(!authUser)
      console.log('onAuthStateChanged', !!authUser)
    })
  }, [])

  return <AuthContext.Provider value={{ authUser, loginFailed }}>{children}</AuthContext.Provider>
}
