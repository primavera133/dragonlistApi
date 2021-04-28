import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useContext } from 'react'
import format from 'date-fns/format'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { useQuery } from 'react-query'
import { faChevronCircleDown, faChevronCircleUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AuthContext } from '../../services/authContext'
import listsApi from '../../api/lists'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'

import { capitalise } from '../../utils/capitalise'
import { mapRegions } from '../../utils/mapRegions'
import { translateName } from '../../utils/translateName'
import { useParams } from 'react-router-dom'

export const HighScorePage = withI18n()(() => {
  const { userDetails: loggedInUserDetails } = useContext(AuthContext)

  const { isFetching: isFetchingHighscores, data: highscores } = useQuery('highscores', listsApi.getHighscores, {
    enabled: !!loggedInUserDetails,
  })

  const isFetching = isFetchingHighscores || !highscores
  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div tw="max-w-md">
            <PageHeader>
              <Trans>Most species</Trans>
            </PageHeader>
          </div>
          <ul>
            {highscores.map((score, i) => (
              <li key={`score${i}`}>
                {score.name}
                {score.amount}
              </li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  )
})
