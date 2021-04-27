import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { AuthContext } from '../../services/authContext'
import speciesApi from '../../api/species'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { getLanguage } from '../../components/Language'
import { ObservationForm } from './ObservationForm'

import { translateName } from '../../utils/translateName'

export const ObservationEditPage = withI18n()(({ history }) => {
  const { userDetails } = useContext(AuthContext)
  const { id } = useParams()
  const [language] = useState(getLanguage())

  const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)
  const { isFetching: isFetchingObservation, data: observation } = useQuery(
    ['observation', id],
    () => speciesApi.getObservation(id),
    {
      enabled: !!id && !!userDetails,
    }
  )

  const queryClient = useQueryClient()

  const isFetching = isFetchingSpecies || isFetchingObservation || !userDetails

  const handleSubmit = async (formData) => {
    await speciesApi.updateObservation(formData)
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
            <Trans>Edit observation</Trans>
          </PageHeader>
          <ObservationForm
            id={id}
            country={observation.country}
            region={observation.region}
            onSubmit={handleSubmit}
            specieName={translateName(observation.specie, species, language)}
            specie={observation.specie}
            date={observation.observationDate}
          />
        </div>
      )}
    </Layout>
  )
})
