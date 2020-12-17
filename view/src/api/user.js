import { getAuthHeader } from '../service/authService'

const getUser = async () => {
  try {
    const url = '/user'

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
      throw new Error('Get user failed')
    }
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error(error)
  }
}

export default { getUser }
