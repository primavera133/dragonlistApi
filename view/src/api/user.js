import { getAuthHeader, logout } from '../service/authService'

const getUser = async () => {
  try {
    const url = '/api/user'

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    if (!response.ok) {
      if (response.status > 400) {
        logout()
      }
      throw new Error('Get user failed')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default { getUser }
