import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import format from 'date-fns/format'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'
import { faEdit, faInfoCircle, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
import { useParams } from 'react-router'

export const ObservationListPage = withI18n()(({ history }) => {
  const { encodedemail } = useParams()
  const [language] = useState(getLanguage())
  const [email, setEmail] = useState()
  const [country, setCountry] = useState('all')
  const [countryList, setCountryList] = useState([])
  const [allCountries, setAllCountries] = useState(true)
  const [region, setRegion] = useState('all')
  const [regionList, setRegionList] = useState([])
  const [allRegions, setAllRegions] = useState(true)
  const [uniqueObservations, setUniqueObservations] = useState([])
  const [expandedSpecies, setExpandedSpecies] = useState(new Set())

  const { userDetails: loggedInUserDetails } = useContext(AuthContext)

  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)
  const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)
  const { isFetching: isFetchingUserObservations, data: userObservations, refetch: refetchUserObservations } = useQuery(
    ['userObservations', email],
    () => listsApi.getUserObservations(email),
    {
      enabled: !!loggedInUserDetails,
    }
  )
  const isFetching = isFetchingCountries || isFetchingSpecies || isFetchingUserObservations

  useEffect(() => {
    if (encodedemail) {
      setEmail(atob(encodedemail))
    }
  }, [encodedemail])

  useEffect(() => {
    if (!isFetchingCountries && country && countries) {
      setRegionList([{ id: 'all', name: i18n._(t`-- All regions --`) }, ...mapRegions(country, countries)])
      setCountryList([{ id: 'all', name: i18n._(t`-- All countries --`) }, ...countries])
    }
  }, [countries, country, isFetchingCountries])

  useEffect(() => {
    if (userObservations && country && region) {
      const uniqueObservations = []
      let number = 1
      userObservations.forEach((obs) => {
        if ((allCountries || obs.country === country) && (allRegions || obs.region === region)) {
          const unique = uniqueObservations.find((uobs) => obs.specie === uobs.specie)
          if (!unique) {
            uniqueObservations.push({
              ...obs,
              number: number++,
              sub: [{ ...obs }],
            })
          } else {
            unique.sub.push({ ...obs })
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

  const handleCountry = (country) => {
    setAllCountries(country === 'all')
    setCountry(country)
  }

  const handleRegion = (region) => {
    setAllRegions(region === 'all')
    setRegion(region)
  }

  const toggleExpandObservation = (obs) => {
    if (expandedSpecies.has(obs.specie)) {
      setExpandedSpecies((prev) => new Set([...prev].filter((x) => x !== obs.specie)))
    } else {
      setExpandedSpecies((previousState) => new Set([...expandedSpecies, obs.specie]))
    }
  }

  const handleEdit = (obs) => {
    console.log('edit', obs)
  }

  const handleDelete = (obs) => {
    if (confirm(i18n._(t`Are you sure you want to delete the observation?`))) {
      listsApi.deleteUserObservation(obs)
      refetchUserObservations()
    }
  }

  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>Observations</Trans>
          </PageHeader>
          <div tw="grid grid-cols-2 mb-8">
            <div tw=" pr-1">
              <Select
                id="country"
                name="country"
                options={countryList}
                onChange={handleCountry}
                selected={country}
                useInitial={false}
              />
            </div>

            <div tw=" pl-1">
              <Select
                id="region"
                name="region"
                options={regionList}
                onChange={handleRegion}
                disabled={!regionList?.length}
                selected={region}
                useInitial={false}
              />
            </div>
          </div>
          <table tw="table-auto w-full">
            <thead>
              <tr>
                <th></th>
                <th tw="align-top text-left">
                  <span tw="pl-1">
                    <Trans>Specie</Trans>
                  </span>
                </th>
                <th tw="align-top text-left"></th>
                <th tw="align-top text-left">
                  <Trans>Date</Trans>
                </th>
              </tr>
            </thead>
            {uniqueObservations.map((obs, i) => (
              <tbody key={`items${i}`}>
                <tr>
                  <td tw="align-top text-sm font-light pt-1">{obs.number}:</td>
                  <td tw="mb-2">
                    <div tw="align-top pr-2">
                      <button
                        tw="px-1 text-lg font-semibold leading-normal text-left"
                        onClick={() => toggleExpandObservation(obs)}
                      >
                        {capitalise(translateName(obs.specie))}
                      </button>
                    </div>
                    <div tw="align-top text-sm font-light leading-normal pr-2 pl-1 ">{capitalise(obs.specie)}</div>
                  </td>
                  <td tw="align-top text-sm font-light pr-2">
                    <button tw="px-3 py-1" onClick={() => toggleExpandObservation(obs)}>
                      {obs.sub.length}
                    </button>
                  </td>
                  <td tw="align-top text-sm leading-normal whitespace-nowrap pt-1">
                    {format(new Date(obs.observationDate), 'yyyy-MM-dd')}
                  </td>
                  <td>
                    <span tw="mr-10"> </span>
                  </td>
                </tr>
                {expandedSpecies.has(obs.specie) &&
                  obs.sub.map((sub, j) => (
                    <tr key={`subitems${i}${j}`}>
                      <td></td>
                      <td tw="align-top text-sm font-light leading-normal pr-2 pl-1">
                        <span>{capitalise(i18n._(t`${sub.country}`))}</span>, <span>{capitalise(sub.region)}</span>
                      </td>
                      <td tw="align-top text-sm font-light pr-2"></td>
                      <td tw="align-top text-sm font-light leading-normal whitespace-nowrap">
                        {format(new Date(sub.observationDate), 'yyyy-MM-dd')}
                      </td>
                      <td tw="align-top text-sm font-light leading-normal whitespace-nowrap">
                        <button tw="px-1" onClick={() => handleEdit(sub)}>
                          <FontAwesomeIcon icon={faEdit} tw="text-gray-500" />
                        </button>
                        <button tw="px-1" onClick={() => handleDelete(sub)}>
                          <FontAwesomeIcon icon={faTrash} tw="text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ))}
          </table>
          <hr tw="mt-1 mb-4" />
          <div tw="flex justify-between">
            <span tw="text-lg font-semibold leading-normal">
              {uniqueObservations.length} / {species?.length}
            </span>

            <Button isPrimary isSmall onClick={goAdd}>
              <Trans>Add observation</Trans>
            </Button>
          </div>
        </div>
      )}
    </Layout>
  )
})
