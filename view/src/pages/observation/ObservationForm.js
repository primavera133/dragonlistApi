import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'

import configApi from '../../api/config'
import speciesApi from '../../api/species'
import { mapRegions } from '../../utils/mapRegions'

import { getLanguage } from '../../components/Language'
import { Select } from '../../components/Select/Select'
import { Search } from '../../components/Search'
import { Button } from '../../components/Button'
import { DatePicker } from '../../components/DatePicker'

export const ObservationForm = withI18n()(
  ({ id, country: c, region: r, specie: s, specieName: n, date: d, onSubmit }) => {
    const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)
    const { isFetching: isFetchingSpecies, data: species } = useQuery('species', speciesApi.getSpecies)
    const [country, setCountry] = useState(c)
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState(r)
    const [specie, setSpecie] = useState(s)
    const [mappedSpecies, setMappedSpecies] = useState([])
    const [observationDate, setObservationDate] = useState(d ? new Date(d) : new Date())

    const isFetching = isFetchingCountries || isFetchingSpecies

    useEffect(() => {
      if (species?.length) {
        const lang = getLanguage()
        const mapped = species.flatMap((s) => {
          const names = [s.scientific_name].concat(s[lang]).filter((n) => !!n)
          return names.map((name) => [s.scientific_name, name])
        })
        setMappedSpecies(mapped)
      }
    }, [species])

    useEffect(() => {
      if (!isFetchingCountries && country) {
        setRegions(mapRegions(country, countries))
      }
    }, [countries, country, isFetchingCountries])

    const validateForm = () => {
      const validCountry = !!country?.length
      const validRegion = !regions?.length ? !!country?.length : true
      const validSpecie = !!specie?.length
      const validDate = observationDate instanceof Date && observationDate?.valueOf() !== NaN

      return validCountry && validRegion && validSpecie && validDate
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (validateForm()) {
        const formData = {
          country,
          region,
          observationDate: observationDate.valueOf(),
          specie,
        }
        if (id) formData.id = id
        onSubmit(formData)
      }
    }

    const handleCountry = (country) => {
      setCountry(country)
      setRegion('')
    }

    return !isFetching ? (
      <form onSubmit={handleSubmit}>
        <div tw="pb-4">
          <Select
            id="country"
            label={i18n._(t`Country`)}
            name="country"
            options={countries}
            onChange={handleCountry}
            selected={country}
          />
        </div>
        {!!regions?.length && (
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
        )}
        <div tw="pb-4">
          <Search label={i18n._(t`Specie`)} names={mappedSpecies} onSelect={setSpecie} initialValue={n} />
        </div>
        <div tw="pb-4">
          <DatePicker onSelectDate={setObservationDate} initialDate={observationDate} />
        </div>
        <div tw="pb-4">
          <Button isPrimary type="submit">
            <Trans>Save observation</Trans>
          </Button>
        </div>
      </form>
    ) : null
  }
)
