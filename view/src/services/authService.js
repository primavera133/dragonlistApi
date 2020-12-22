import firebase from 'firebase/app'

export const addRoles = (roles) => {
  try {
    if (!roles) {
      throw new Error('no roles')
    }
    const auth = JSON.parse(window.localStorage.getItem('auth'))
    window.localStorage.setItem('auth', JSON.stringify({ ...auth, roles }))
  } catch (error) {
    console.error(error)
    throw new Error('oh shit')
  }
}

export const getAuthHeader = async () => {
  console.log('getAuthHeader')
  try {
    const token = await firebase.auth().currentUser.getIdToken()
    return { Authorization: `Bearer ${token}` }
  } catch (error) {
    throw new Error('Authentication error')
  }
}
