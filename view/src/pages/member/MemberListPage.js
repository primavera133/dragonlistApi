import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faPhone, faClipboardList, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../services/authContext'
import configApi from '../../api/config'
import { memberApi } from '../../api/member'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { Select } from '../../components/Select/Select'

import { capitalise } from '../../utils/capitalise'
import { mapRegions } from '../../utils/mapRegions'

export const MemberListPage = withI18n()(({ history }) => {
  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [allCountries, setAllCountries] = useState(false)
  const [region, setRegion] = useState('all')
  const [regionList, setRegionList] = useState([])
  const [allRegions, setAllRegions] = useState(false)
  const [membersList, setMemebersList] = useState([])

  const { userDetails } = useContext(AuthContext)

  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)
  const { isFetching: isFetchingMembers, data: members } = useQuery('members', memberApi.getMembers, {
    enabled: !!userDetails,
  })

  const isFetching = isFetchingCountries || isFetchingMembers

  useEffect(() => {
    if (userDetails) {
      setCountry(userDetails?.residentCountry)
      setRegion(userDetails?.residentRegion)
    }
  }, [userDetails])

  useEffect(() => {
    if (!isFetchingCountries && country && countries) {
      setRegionList([{ id: 'all', name: i18n._(t`-- All regions --`) }, ...mapRegions(country, countries)])
      setCountryList([{ id: 'all', name: i18n._(t`-- All countries --`) }, ...countries])
    }
  }, [countries, country, isFetchingCountries])

  useEffect(() => {
    if (!members) return
    setMemebersList(
      members.filter((member) => {
        return (allCountries || member.residentCountry === country) && (allRegions || member.residentRegion === region)
      })
    )
  }, [members, country, region, allCountries, allRegions])

  const handleCountry = (country) => {
    setAllCountries(country === 'all')
    setCountry(country)
    if (country === 'all') {
      setRegion('all')
      setAllRegions(true)
    }
  }

  const handleRegion = (region) => {
    setAllRegions(region === 'all')
    setRegion(region)
  }

  return (
    <Layout>
      {isFetching || !membersList ? (
        <Loader />
      ) : (
        <div tw="max-w-md">
          <PageHeader>
            <Trans>All users</Trans>
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
          <ul>
            {membersList.map((member, i) => (
              <li key={`items${i}`} tw="border-b-2 last:border-0 py-2">
                <div>
                  <span tw="text-lg font-semibold leading-normal pr-2">
                    {member.firstName} {member.lastName}
                  </span>
                  <span tw="text-lg font-light leading-normal pr-2">
                    {capitalise(member.residentCountry)}, {capitalise(member.residentRegion)}
                  </span>
                </div>
                {member.contactEmail && (
                  <div tw="pl-1">
                    <FontAwesomeIcon icon={faAt} tw="text-gray-500 text-sm mr-1" />
                    <a
                      tw="text-sm font-light leading-normal pr-2"
                      href={`mailto:${member.contactEmail}`}
                      rel="noopener noreferrer"
                    >
                      {member.contactEmail}
                    </a>
                  </div>
                )}
                {member.contactPhone && (
                  <div tw="pl-1">
                    <FontAwesomeIcon icon={faPhone} tw="text-gray-500 text-sm mr-1" />
                    <a
                      tw="text-sm font-light leading-normal pr-2"
                      href={`tel:${member.contactPhone}`}
                      rel="noopener noreferrer"
                    >
                      {member.contactPhone}
                    </a>
                  </div>
                )}
                <div tw="pl-1 flex justify-between items-end">
                  <Link tw="hover:underline" to={`/member/${btoa(member.email)}/list`}>
                    <FontAwesomeIcon icon={faClipboardList} tw="text-gray-500 text-sm mr-1" />
                    <Trans>Total observations</Trans>:{' '}
                    {member.observationsCount
                      ? Object.keys(member.observationsCount).reduce((acc, curr) => {
                          return acc + member.observationsCount[curr].total
                        }, 0)
                      : 0}
                  </Link>
                  <Link tw="hover:underline" to={`/member/${btoa(member.email)}/list`}>
                    <FontAwesomeIcon icon={faArrowRight} tw="text-gray-500 text-xs mr-1" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          {/* <hr tw="mt-1 mb-4" /> */}
          <div tw="flex justify-between">
            <span tw="text-lg font-semibold leading-normal mt-4">
              {membersList.length} / {members?.length}
            </span>
          </div>
        </div>
      )}
    </Layout>
  )
})
