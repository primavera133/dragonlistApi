import { defaultFetchSettings } from './common'

const postSignup = async (userData) => {
  try {
    const url = `/api/signup`

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'POST',
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Signup failed')
    }
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { postSignup }
