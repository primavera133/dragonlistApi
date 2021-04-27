import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQueryClient } from 'react-query'

import { AuthContext } from '../../services/authContext'
import speciesApi from '../../api/species'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { ObservationForm } from './ObservationForm'

export const ObservationAddPage = withI18n()(({ history }) => {
  const { userDetails } = useContext(AuthContext)

  const queryClient = useQueryClient()

  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')

  useEffect(() => {
    if (userDetails) {
      setCountry(userDetails?.residentCountry)
      setRegion(userDetails?.residentRegion)
    }
  }, [userDetails])

  const isFetching = !country || !region

  const handleSubmit = async (formData) => {
    await speciesApi.postObservation(formData)
    queryClient.clear(['userObservations', userDetails.email])
    history.push(`/member/${btoa(userDetails.email)}/list`)
  }

  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>Add observation</Trans>
          </PageHeader>
          <ObservationForm country={country} region={region} onSubmit={handleSubmit} />
        </div>
      )}
    </Layout>
  )
})
