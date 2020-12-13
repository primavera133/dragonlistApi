import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as AuthService from '../service/authService'

const ProtectedRoute = ({ component: Component, permittedRoles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated(permittedRoles) === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
