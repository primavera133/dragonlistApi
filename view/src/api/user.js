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

export default { getUser }
