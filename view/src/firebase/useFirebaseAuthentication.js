import { firebaseApp } from './index'
import react, { useState } from 'react'

const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unlisten = firebaseApp.auth().onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })
    return () => {
      unlisten()
    }
  })

  return authUser
}

export default useFirebaseAuthentication
