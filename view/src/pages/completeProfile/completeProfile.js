import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from 'react'

import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import tw from 'twin.macro'

import { AuthContext } from '../../services/authContext'
import Layout from '../../components/Layout/Layout'
import PageHeader from '../../components/PageHeader/PageHeader'
import Loader from '../../components/Loader/Loader'
import NewUserForm from '../../components/NewUserForm/NewUserForm'

const completeProfile = ({}) => {
  const { authUser, authUserLoading, userDetails } = useContext(AuthContext)

  useEffect(() => {
    console.log('authUser', authUser)
    console.log('userDetails', userDetails)
  }, [authUser])

  return (
    <Layout>
      <div tw="max-w-md">
        {authUserLoading && <Loader />}
        <PageHeader>
          <Trans>Welcome new user</Trans>
        </PageHeader>
      </div>
      {authUser && authUser.email && (
        <div tw="max-w-md">
          <NewUserForm email={authUser.email} />
        </div>
      )}
    </Layout>
  )
}

export default withI18n()(completeProfile)
