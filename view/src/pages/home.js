import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'

// import configApi from '../api/config'
import Layout from '../components/Layout'

const homePage = ({ history }) => {
  // useQuery('countries', configApi.getCountries)
  return <Layout>HOME</Layout>
}

export default homePage
