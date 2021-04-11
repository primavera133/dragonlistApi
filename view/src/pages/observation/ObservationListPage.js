import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import format from 'date-fns/format'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'

import { AuthContext } from '../../services/authContext'
import listsApi from '../../api/lists'
import speciesApi from '../../api/species'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'

export const ObservationListPage = withI18n()(({ history }) => {
  const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)

  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [uniqueObservations, setUniqueObservations] = useState([])
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
      const uniqueObservations = []
      userObservations.forEach((obs) => {
        if (!uniqueObservations.find((uobs) => obs.specie === uobs.specie)) {
          uniqueObservations.push(obs)
        }
      })
      setUniqueObservations(uniqueObservations)
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
          </PageHeader>
          <h3 tw="flex justify-between">
            <span tw="text-xl mb-2 font-semibold leading-normal">
              <Trans>Total list</Trans>{' '}
            </span>
            <span tw="text-lg font-semibold leading-normal">
              {uniqueObservations.length} / {species?.length}
            </span>
          </h3>
          <ul>
            {uniqueObservations.map((obs, i) => (
              <li key={`items${i}`} tw="flex justify-between">
                <span tw="text-lg font-semibold leading-normal pr-2">{obs.specie}</span>
                <span tw="text-sm leading-normal">{format(new Date(obs.observationDate), 'yyyy-MM-dd')}</span>
              </li>
            ))}
          </ul>
          <hr tw="mt-1 mb-4" />
        </div>
      )}
    </Layout>
  )
})
