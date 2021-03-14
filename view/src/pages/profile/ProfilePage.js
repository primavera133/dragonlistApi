import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import tw, { styled } from 'twin.macro'

import React, { useEffect, useState, useContext } from 'react'
import { t, Trans } from '@lingui/macro'
import { AuthContext } from '../../services/authContext'
import { Layout } from '../../components/Layout'
import { PageHeader } from '../../components/PageHeader'
import { Loader } from '../../components/Loader'
import { Button } from '../../components/Button'

export const ProfilePage = ({ history }) => {
  const { userDetails } = useContext(AuthContext)

  return (
    <Layout>
      <PageHeader>
        <Trans>My pages</Trans>
      </PageHeader>
      {userDetails ? (
        <div tw="font-sans text-gray-600">
          <ul tw="my-4">
            {userDetails.roles.includes('admin') ? (
              <li tw="pb-2">
                <Trans>Role</Trans>: <Trans>Admin</Trans>
              </li>
            ) : null}
            <li tw="pb-2 text-lg font-sans">
              <Trans>Name</Trans>:{userDetails.firstName} {userDetails.lastName}
            </li>
            <li tw="pb-2">
              <Trans>Resident country</Trans>: {userDetails.residentCountry}
            </li>
            <li tw="pb-2">
              <Trans>Resident region</Trans>: {userDetails.residentRegion}
            </li>
            <li tw="pb-2">
              <Trans>email</Trans>: <a href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
            </li>
            <li tw="pb-2">
              <Trans>contactEmail</Trans>: <a href={`mailto:${userDetails.contactEmail}`}>{userDetails.contactEmail}</a>
            </li>
            <li tw="pb-2">
              <Trans>contactPhone</Trans>: <a href={`tel:${userDetails.contactPhone}`}>{userDetails.contactPhone}</a>
            </li>
          </ul>
          <Button isSecondary isSmall onClick={() => history.push('/editProfile')}>
            <Trans>Edit</Trans>
          </Button>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}
