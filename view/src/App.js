import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import login from './pages/login'

const App = () => (
  <>
    <GlobalStyles />
    <Router>
      <Switch>
        <Route exact path="/login" component={login} />
      </Switch>
    </Router>
  </>
)

export default App
