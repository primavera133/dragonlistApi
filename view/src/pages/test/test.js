import { jsx } from '@emotion/react'

import React from 'react'
import Layout from '../../components/Layout/Layout'

const testPage = ({ history }) => {
  return <Layout>Test Protected page without XHR</Layout>
}

export default testPage
