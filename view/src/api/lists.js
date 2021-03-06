import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getUserObservations = async () => {
  try {
    const url = `/api/observations/user/${userId}`
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
      const errorBody = await response.json()
      throw new Error(`Get user observations failed: ${errorBody.error}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getUserObservations }