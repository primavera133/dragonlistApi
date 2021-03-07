import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from 'react'

import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import tw from 'twin.macro'

import { AuthContext } from '../../services/authContext'
import { Layout } from '../../components/Layout'
import { PageHeader } from '../../components/PageHeader'
import { Loader } from '../../components/Loader'
import { NewUserForm } from '../../components/NewUserForm'

export const CompleteProfilePage = withI18n()(({ history }) => {
  const { authUser, authUserLoading, userDetails } = useContext(AuthContext)

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
          <NewUserForm
            history={history}
            // email={authUser.email}
          />
        </div>
      )}
    </Layout>
  )
})
