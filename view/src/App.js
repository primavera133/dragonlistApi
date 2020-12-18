import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import { GlobalStyles } from 'twin.macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import homePage from './pages/home'
import loginPage from './pages/login'
import signupPage from './pages/signup'
import profilePage from './pages/profile'
import adminPage from './pages/admin'

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={homePage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/signup" component={signupPage} />
          <ProtectedRoute exact path="/profile" component={profilePage} permittedRoles={['user']} />
          <ProtectedRoute exact path="/admin" component={adminPage} permittedRoles={['admin']} />
        </Switch>
      </Router>
    </>
  )
}

export default App
