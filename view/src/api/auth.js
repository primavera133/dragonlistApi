const defaultFetchSettings = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

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
