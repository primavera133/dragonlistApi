const postLogin = async (userData) => {
  try {
    const url = '/login'

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const jsonData = response.json()
    localStorage.setItem('AuthToken', `Bearer ${jsonData.token}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { postLogin }
