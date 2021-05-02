import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getUserObservations = async (userId) => {
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

const deleteUserObservation = async ({ id }) => {
  try {
    const url = `/api/observation/${id}`
    const authHeader = await getAuthHeader()

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
    })
    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Delete user observation failed: ${errorBody.error}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const getHighscores = async () => {
  try {
    const url = `/api/highscores`
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
      throw new Error(`Get highscores failed: ${errorBody.error}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const getUserTotals = async (email) => {
  try {
    const url = `/api/totals/user/${email}`
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
      throw new Error(`Get user totals failed: ${errorBody.error}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const getTopObservers = async (country) => {
  try {
    const url = `/api/top/observers/${country}`
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
      throw new Error(`Get top observers failed: ${errorBody.error}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getUserObservations, deleteUserObservation, getHighscores, getUserTotals, getTopObservers }
