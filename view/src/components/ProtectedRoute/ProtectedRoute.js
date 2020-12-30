import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
// import * as AuthService from '../services/authService'
import { AuthContext } from '../../services/authContext'
import Layout from '../Layout/Layout'
import Loader from '../Loader/Loader'

const ProtectedRoute = ({ component: Component, permittedRoles, ...rest }) => {
  const { authUser, loginFailed } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loginFailed) {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
        }
        if (!authUser)
          return (
            <Layout>
              <Loader />
            </Layout>
          )
        // AuthService.isAuthenticated(permittedRoles) === true ? (
        return <Component {...props} />
      }}
    />
  )
}

export default ProtectedRoute
