import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getUser = async () => {
  try {
    const url = '/api/user'
    const authHeader = await getAuthHeader()

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
    })
    if (!response.ok) {
      // if (response.status > 400) {
      //   logout()
      // }
      throw new Error('Get user failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const postUser = async (userData) => {
  console.log('postUser', userData)
  try {
    const url = '/api/user'
    const authHeader = await getAuthHeader()
    console.log('authHeader', authHeader)

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: userData,
    })
    if (!response.ok) {
      // if (response.status > 400) {
      //   logout()
      // }
      throw new Error(`Post user failed: ${response.message}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getUser, postUser }
