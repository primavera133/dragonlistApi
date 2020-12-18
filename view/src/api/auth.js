import { defaultFetchSettings } from './common'

const postLogin = async (userData) => {
  try {
    const url = '/api/login'

    const response = await fetch(url, {
      ...defaultFetchSettings,
      method: 'POST',
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error(error)
    throw error
  }
}

const postSignup = async (userData) => {
  try {
    const url = '/api/signup'

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

export default { postLogin, postSignup }
