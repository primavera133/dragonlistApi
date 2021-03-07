import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from 'react'
import tw, { css } from 'twin.macro'
import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { useQuery } from 'react-query'

import { AuthContext } from '../../services/authContext'
import configApi from '../../api/config'
import userApi from '../../api/user'
import TextInput from '../TextInput/TextInput'
import { Select } from '../Select'
import { Button } from '../Button'
import { FormLegend } from '../FormLegend'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export const NewUserForm = withI18n()(({ i18n, history }) => {
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [email, setEmail] = useState('')
  const [formDisabled, setFormDisabled] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [residentCountry, setResidentCountry] = useState('')
  const [regions, setRegions] = useState('')
  const [residentRegion, setResidentRegion] = useState('')

  const { userDetails, setUnfinishedProfile } = useContext(AuthContext)
  const { isFetching: isFetchingCountries, data: countries } = useQuery('countries', configApi.getCountries)

  const requiredProps = [contactEmail, firstName, lastName, residentCountry]

  useEffect(() => {
    if (userDetails) {
      setContactEmail(userDetails.contactEmail || '')
      setContactPhone(userDetails.contactPhone || '')
      setEmail(userDetails.email || '')
      setFirstName(userDetails.firstName || '')
      setLastName(userDetails.lastName || '')
      setResidentCountry(userDetails.residentCountry || '')
      setResidentRegion(userDetails.residentRegion || '')
    }
  }, [userDetails])

  useEffect(() => {
    if (!isFetchingCountries && residentCountry) {
      try {
        const { regions } = countries.find((c) => c.itemID === residentCountry)
        const mappedRegions = regions.map((r) => ({
          id: r.toLowerCase(),
          name: r.charAt(0).toUpperCase() + r.slice(1),
        }))
        setRegions(mappedRegions)
      } catch (error) {
        console.log(error)
      }
    }
  }, [countries, residentCountry, isFetchingCountries])

  useEffect(() => {
    setFormDisabled(!validateForm())
  }, [...requiredProps])

  const validateForm = () => {
    return requiredProps.every((p) => p.length >= 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    const userData = {
      contactEmail,
      firstName,
      lastName,
      residentCountry,
      contactPhone,
      contactEmail,
      unfinishedProfile: false,
    }
    if (residentRegion) {
      userData.residentRegion = residentRegion
    }
    await userApi.putUser(JSON.stringify(userData))
    setUnfinishedProfile(false)
    history.push('/profile')
  }

  return (
    <>
      <form tw="" onSubmit={handleSubmit}>
        <fieldset tw="mb-8">
          <FormLegend>
            <Trans>Basic personal details</Trans>
          </FormLegend>
          <TextInput id="email" type="email" name="email" label={i18n._(t`Email`)} value={email} disabled />
          <TextInput
            id="firstName"
            name="firstName"
            required
            label={i18n._(t`First name`)}
            value={firstName}
            onChange={setFirstName}
          />
          <TextInput
            id="lastName"
            name="lastName"
            required
            label={i18n._(t`Last name`)}
            value={lastName}
            onChange={setLastName}
          />
          {!isFetchingCountries && (
            <Select
              id="residentCountry"
              label={i18n._(t`Resident country`)}
              name="residentCountry"
              options={countries}
              onChange={setResidentCountry}
              selected={residentCountry}
            />
          )}
          {!!regions?.length && (
            <Select
              id="residentRegion"
              label={i18n._(t`Resident region`)}
              name="residentRegion"
              options={regions}
              onChange={setResidentRegion}
              selected={residentRegion}
            />
          )}
        </fieldset>
        <fieldset>
          <FormLegend>
            <Trans>Contact details</Trans>
          </FormLegend>
          <p tw="mb-8">
            <Trans>
              Contact details are voluntary, choose freely how you wish to be contacted by other members. No contact
              details are visible for other users, unless they are logged in.
            </Trans>
          </p>
          <TextInput
            id="contactPhone"
            name="contactPhone"
            label={i18n._(t`Phone number`)}
            value={contactPhone}
            onChange={setContactPhone}
            supText={i18n._(t`Including a country prefix is helpful.`)}
          />
          <TextInput
            id="contactEmail"
            name="contactEmail"
            label={i18n._(t`Email for contact`)}
            value={contactEmail}
            onChange={setContactEmail}
            supText={i18n._(t`This email can be the one you login with, or any other.`)}
          />
        </fieldset>
        <div>
          <Button isPrimary type="submit" disabled={formDisabled}>
            <Trans>Save</Trans>
          </Button>
          {formDisabled && (
            <div tw="my-2 text-sm">
              <FontAwesomeIcon icon={faInfoCircle} tw="mr-2 text-gray-500" />
              <Trans>There are still mandatory fields missing. You will be able to save when those are completed</Trans>
            </div>
          )}
        </div>
      </form>
    </>
  )
})
