import { getAuthHeader } from '../services/authService'
import { defaultFetchSettings } from './common'

const getSpecies = async () => {
  try {
    const url = '/api/species'

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Get species failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const getObservation = async (id) => {
  try {
    const url = `/api/observation/${id}`
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
      throw new Error('Get observation failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const postObservation = async (body) => {
  try {
    const url = '/api/observation'
    const authHeader = await getAuthHeader()

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error('Post observation failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

const updateObservation = async (body) => {
  try {
    const url = `/api/observation/${body.id}`
    const authHeader = await getAuthHeader()

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error('Put observation failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getSpecies, postObservation, updateObservation, getObservation }
