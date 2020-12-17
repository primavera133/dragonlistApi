export const login = (token, roles) => {
  window.localStorage.setItem('auth', JSON.stringify({ token, roles }))
}

export const getAuthHeader = () => {
  try {
    const auth = JSON.parse(window.localStorage.getItem('auth'))
    return { Authorization: `Bearer ${auth.token}` }
  } catch (error) {
    console.error(error)
  }
}

export const isAuthenticated = (withRoles) => {
  if (window.localStorage.getItem('auth') == null) {
    return false
  } else {
    if (withRoles) {
      const auth = JSON.parse(window.localStorage.getItem('auth'))
      const permissonIntersection = withRoles.filter((role) => auth.roles.includes(role))
      if (!permissonIntersection.length) {
        return false
      }
    }
    return true
  }
}

export const logout = () => {
  if (window.localStorage.getItem('auth') != null) {
    window.localStorage.removeItem('auth')
  }
}
