import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import format from 'date-fns/format'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'

import { AuthContext } from '../../services/authContext'
import configApi from '../../api/config'
import listsApi from '../../api/lists'
import speciesApi from '../../api/species'

import { Layout } from '../../components/Layout'
import { getLanguage } from '../../components/Language'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { Button } from '../../components/Button'
import { Select } from '../../components/Select/Select'

import { capitalise } from '../../utils/capitalise'
import { mapRegions } from '../../utils/mapRegions'

export const ObservationListPage = withI18n()(({ history }) => {
  const [email, setEmail] = useState('')
  const [language] = useState(getLanguage())
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('all')
  const [regions, setRegions] = useState([])
  const [allRregions, setAllRegions] = useState(true)
  const [uniqueObservations, setUniqueObservations] = useState([])

  const { userDetails } = useContext(AuthContext)

  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)
  const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)
  const { isFetching: isFetchingUserObservations, data: userObservations } = useQuery(
    ['userObservations', email],
    () => listsApi.getUserObservations(email),
    {
      enabled: !!email,
    }
  )
  const isFetching = isFetchingCountries || isFetchingSpecies || isFetchingUserObservations

  useEffect(() => {
    if (userDetails) {
      setEmail(userDetails.email)
      setCountry(userDetails?.residentCountry)
      // setRegion(userDetails?.residentRegion)
    }
  }, [userDetails])

  useEffect(() => {
    if (!isFetchingCountries && country && countries) {
      setRegions([{ id: 'all', name: i18n._(t`-- All regions --`) }, ...mapRegions(country, countries)])
    }
  }, [countries, country, isFetchingCountries])

  useEffect(() => {
    if (userObservations && country && region) {
      const uniqueObservations = []
      let number = 1
      userObservations.forEach((obs) => {
        if (!uniqueObservations.find((uobs) => obs.specie === uobs.specie)) {
          if (obs.country === country && (allRregions || obs.region === region)) {
            uniqueObservations.push({
              ...obs,
              number: number++,
            })
          }
        }
      })
      setUniqueObservations(uniqueObservations)
    }
  }, [userObservations, country, region])

  const translateName = (scientificName) => {
    const specie = species.filter((sp) => sp.scientific_name === scientificName)[0] ?? []
    return specie[language][0] ?? scientificName
  }

  const goAdd = () => {
    history.push('/observation/add')
  }

  const handleRegion = (region) => {
    setAllRegions(region === 'all')
    setRegion(region)
  }

  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>Your observations</Trans>
          </PageHeader>
          <div tw="grid grid-cols-2 mb-8">
            <div tw=" pr-1">
              <Select
                id="country"
                name="country"
                options={countries}
                onChange={setCountry}
                selected={country}
                useInitial={false}
              />
            </div>

            <div tw=" pl-1">
              <Select
                id="region"
                name="region"
                options={regions}
                onChange={handleRegion}
                disabled={!regions?.length}
                selected={region}
                useInitial={false}
              />
            </div>
          </div>
          <ul>
            {uniqueObservations.map((obs, i) => (
              <li key={`items${i}`} tw="flex justify-between">
                <div tw="mb-2">
                  <span tw="text-sm font-light pr-2">{obs.number}:</span>
                  <span tw="text-lg font-semibold leading-normal pr-2">{capitalise(translateName(obs.specie))}</span>
                  <span tw="text-sm font-light leading-normal pr-2 ">{capitalise(obs.specie)}</span>
                </div>
                <span tw="text-sm leading-normal">{format(new Date(obs.observationDate), 'yyyy-MM-dd')}</span>
              </li>
            ))}
          </ul>
          <hr tw="mt-1 mb-4" />
          <div tw="flex justify-between">
            <span tw="text-lg font-semibold leading-normal">
              {uniqueObservations.length} / {species?.length}
            </span>

            <Button isPrimary isSmall onClick={goAdd}>
              <Trans>Add specie</Trans>
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
})
