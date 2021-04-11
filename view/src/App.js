import React, { useEffect } from 'react'
// import { GlobalStyles } from 'twin.macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { AuthProvider } from './services/authContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import { detectLanguage, dynamicActivate } from './i18n'

import { ContactPage } from './pages/contact'
import { CompleteSignInPage } from './pages/completeSignIn'
import { CompleteProfilePage } from './pages/completeProfile'
import { HomePage } from './pages/home'
import { HowToPage } from './pages/howto'
import { SignInEmailPage } from './pages/signin'
import { ProfilePage } from './pages/profile'
import { ObservationAddPage, ObservationListPage } from './pages/observation'
import { AdminPage } from './pages/admin'
import { TermsAndConditionsPage } from './pages/termsAndConditions'
import { PrivacyPolicyPage } from './pages/privacyPolicy'

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
  useEffect(() => {
    const result = detectLanguage()

    dynamicActivate(result)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider i18n={i18n}>
          {/* <GlobalStyles /> */}
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/completeSignIn" component={CompleteSignInPage} />
              <Route exact path="/completeProfile" component={CompleteProfilePage} />
              <Route exact path="/editProfile" component={CompleteProfilePage} />
              <Route exact path="/how-to" component={HowToPage} />
              <Route exact path="/observation/add" component={ObservationAddPage} />
              <Route exact path="/observation/list" component={ObservationListPage} />
              <Route exact path="/privacypolicy" component={PrivacyPolicyPage} />
              <Route exact path="/signin" component={SignInEmailPage} />
              <Route exact path="/termsandconditions" component={TermsAndConditionsPage} />
              <ProtectedRoute exact path="/profile" component={ProfilePage} permittedRoles={['user']} />
              <ProtectedRoute exact path="/admin" component={AdminPage} permittedRoles={['admin']} />
            </Switch>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
