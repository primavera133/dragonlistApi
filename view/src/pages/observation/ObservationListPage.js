import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'

import { AuthContext } from '../../services/authContext'
import listsApi from '../../api/lists'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'

export const ObservationListPage = withI18n()(({ history }) => {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  const { userDetails } = useContext(AuthContext)

  const { isFetching: isFetchingUserObservations, data: userObservations } = useQuery(
    ['userObservations', email],
    () => listsApi.getUserObservations(email),
    {
      enabled: !!email,
    }
  )

  useEffect(() => {
    if (userDetails) {
      setEmail(userDetails.email)
      setCountry(userDetails?.residentCountry)
      setRegion(userDetails?.residentRegion)
    }
  }, [userDetails])

  useEffect(() => {
    if (userObservations) {
      setIsFetching(false)
    }
  }, [userObservations])

  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>Your observations</Trans>
            <ul>
              {userObservations.map((obs) => (
                <li>{obs.specie}</li>
              ))}
            </ul>
          </PageHeader>
        </div>
      )}
    </Layout>
  )
})
