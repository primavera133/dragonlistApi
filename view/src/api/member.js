import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getMembers = async () => {
  try {
    const url = '/api/members'
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
      throw new Error('Get members failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const memberApi = { getMembers }
