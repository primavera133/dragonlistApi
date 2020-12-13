export const login = (token) => {
  window.localStorage.setItem('auth', token)
}

export const isAuthenticated = () => {
  if (window.localStorage.getItem('auth') == null) {
    return false
  } else {
    return true
  }
}

export const logout = () => {
  if (window.localStorage.getItem('auth') != null) {
    window.localStorage.removeItem('auth')
  }
}
