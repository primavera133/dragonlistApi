import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import { Trans } from '@lingui/macro'

import { AuthContext } from '../../services/authContext'
import listApi from '../../api/lists'

export const TopObservers = ({ country }) => {
  const { userDetails: loggedInUserDetails } = useContext(AuthContext)

  const { isFetching: isFetchingTopObservers, data: topObservers } = useQuery(
    ['topObservers', country],
    () => listApi.getTopObservers(country),
    {
      enabled: !!loggedInUserDetails,
    }
  )

  if (isFetchingTopObservers || !topObservers || !topObservers.length) return null

  return <div>
    <ul>
      {topObservers.map((o, i) => (<li key={`topobserver${i}`}>
        <span>{i+1}: </span>
        <span>{o[country]}</span> <Trans>species</Trans>
        {', '}
        <span>{o.name}</span>
      </li>))}
    </ul>
  </div>
}
