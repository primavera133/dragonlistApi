import react, { createContext } from 'react'
import { app } from './firebase'

export const FirebaseContext = createContext()

const FirebaseProvider = (props) => <FirebaseContext.Provider value={app}>{props.children}</FirebaseContext.Provider>

export default FirebaseProvider
