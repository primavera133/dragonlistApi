import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'

import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'

import { Layout } from '../../components/Layout'
import { PageHeader } from '../../components/PageHeader'
import { TopObservers } from '../../components/Highscores'

export const HighScorePage = withI18n()(() => {

  return (
    <Layout>
          <div tw="max-w-md">
            <PageHeader>
              <Trans>Most species</Trans>
            </PageHeader>
          </div>

          <div tw="mb-4">
            <h3 tw="font-bold"><Trans>Most species in total</Trans></h3>
            <TopObservers country="total" />
          </div>

          <div tw="mb-4">
            <h3 tw="font-bold"><Trans>Most species in Sweden</Trans></h3>
            <TopObservers country="sweden" />
          </div>
    </Layout>
  )
})
