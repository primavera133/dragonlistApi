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

import contactPage from './pages/contact/Contact'
import completeSignInPage from './pages/completeSignIn/completeSignIn'
import completeProfile from './pages/completeProfile/completeProfile'
import homePage from './pages/home/home'
import howToPage from './pages/howto/howto'
import signinEmailPage from './pages/signin/signinemail'
import profilePage from './pages/profile/profile'
import observationAddPage from './pages/observation/add'
import adminPage from './pages/admin/admin'
import termsAndConditionsPage from './pages/termsAndConditions/TermsAndConditions'
import testPage from './pages/test/test'
import privacyPolicyPage from './pages/privacyPolicy/PrivacyPolicy'

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
              <Route exact path="/" component={homePage} />
              <Route exact path="/contact" component={contactPage} />
              <Route exact path="/completeSignIn" component={completeSignInPage} />
              <Route exact path="/completeProfile" component={completeProfile} />
              <Route exact path="/how-to" component={howToPage} />
              <Route exact path="/observation/add" component={observationAddPage} />
              <Route exact path="/privacypolicy" component={privacyPolicyPage} />
              <Route exact path="/signin" component={signinEmailPage} />
              <Route exact path="/termsandconditions" component={termsAndConditionsPage} />
              <ProtectedRoute exact path="/profile" component={profilePage} permittedRoles={['user']} />
              <ProtectedRoute exact path="/admin" component={adminPage} permittedRoles={['admin']} />
              <ProtectedRoute exact path="/test" component={testPage} permittedRoles={['user']} />
            </Switch>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
