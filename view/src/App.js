import React, { useEffect } from 'react'
import { GlobalStyles } from 'twin.macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from './services/authContext'
import ProtectedRoute from './components/ProtectedRoute'

import completeSigninPage from './pages/completeSignIn'
import homePage from './pages/home'
import signinEmailPage from './pages/signinemail'
import profilePage from './pages/profile'
import adminPage from './pages/admin'
import testPage from './pages/test'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0,
      staleTime: 60000,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route exact path="/completeSignIn" component={completeSigninPage} />
            <Route exact path="/signinemail" component={signinEmailPage} />
            <ProtectedRoute exact path="/profile" component={profilePage} permittedRoles={['user']} />
            <ProtectedRoute exact path="/admin" component={adminPage} permittedRoles={['admin']} />
            <ProtectedRoute exact path="/test" component={testPage} permittedRoles={['user']} />
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
