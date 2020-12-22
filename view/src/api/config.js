import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getCountries = async () => {
  try {
    const url = '/api/countries'

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Get countries failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getCountries }
