import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'

import { AuthContext } from '../../services/authContext'
import configApi from '../../api/config'
import listsApi from '../../api/lists'
import speciesApi from '../../api/species'

import { DatePicker } from '../../components/DatePicker'
import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { Select } from '../../components/Select/Select'
import { Search } from '../../components/Search'
import { Button } from '../../components/Button'

export const ObservationAddPage = withI18n()(({ history }) => {
  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)
  const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)
  // const { isFetching: isFetchingUserObservations, data: userObservations } = useQuery(
  //   'userObservations',
  //   listsApi.getUserObservations
  // )

  const { userDetails } = useContext(AuthContext)

  const [country, setCountry] = useState('')
  const [regions, setRegions] = useState([])
  const [region, setRegion] = useState('')
  const [specie, setSpecie] = useState('')
  const [mappedSpecies, setMappedSpecies] = useState([])
  const [observationDate, setObservationDate] = useState(new Date())

  useEffect(() => {
    if (!isFetchingCountries && country) {
      try {
        const { regions } = countries.find((c) => c.itemID === country)
        const mappedRegions = regions.map((r) => ({
          id: r.toLowerCase(),
          name: r.charAt(0).toUpperCase() + r.slice(1),
        }))
        setRegions(mappedRegions)
      } catch (error) {
        //console.log(error)
      }
    }
  }, [countries, country, isFetchingCountries])

  useEffect(() => {
    if (species?.length) {
      setMappedSpecies(species.map((s) => [s.scientific_name, s.scientific_name]))
    }
  }, [species])

  useEffect(() => {
    if (userDetails) {
      setCountry(userDetails?.residentCountry)
      setRegion(userDetails?.residentRegion)
    }
  }, [userDetails])

  const isFetching = () => {
    // return isFetchingCountries || isFetchingSpecies || isFetchingUserObservations
    return isFetchingCountries || isFetchingSpecies
  }

  const validateForm = () => {
    const validCountry = !!country?.length
    const validRegion = !regions?.length ? !!country?.length : true
    const validSpecie = !!specie?.length
    const validDate = observationDate instanceof Date && observationDate?.valueOf() !== NaN

    return validCountry && validRegion && validSpecie && validDate
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      speciesApi.postObservation({
        country,
        region,
        observationDate: observationDate.valueOf(),
        specie,
      })
    }
  }

  return (
    <Layout>
      {isFetching() ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>Add observation</Trans>
          </PageHeader>
          <form onSubmit={handleSubmit}>
            <div tw="pb-4">
              <Select
                id="country"
                label={i18n._(t`Country`)}
                name="country"
                options={countries}
                onChange={setCountry}
                selected={country}
              />
            </div>
            <div tw="pb-4">
              <Select
                id="region"
                label={i18n._(t`Region`)}
                name="region"
                options={regions}
                onChange={setRegion}
                disabled={!regions?.length}
                selected={region}
              />
            </div>
            <div tw="pb-4">
              <Search label={i18n._(t`Specie`)} names={mappedSpecies} onSelect={setSpecie} />
            </div>
            <div tw="pb-4">
              <DatePicker onSelectDate={setObservationDate} />
            </div>
            <div tw="pb-4">
              <Button isPrimary type="submit">
                <Trans>Save observation</Trans>
              </Button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  )
})