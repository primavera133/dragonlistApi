import { jsx } from '@emotion/react'

/** @jsxImportSource @emotion/react */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'

import tw from 'twin.macro'

import { Layout } from '../../components/Layout'
import { PageHeader } from '../../components/PageHeader'

export const ContactPage = ({ history }) => {
  return (
    <Layout>
      <PageHeader>Contact us</PageHeader>
      <div>
        <span tw="mr-2">
          <FontAwesomeIcon icon={faAt} focusable={false} />
        </span>
        <a href="mailto:jonas.myrenas@gmail.com">jonas.myrenas@gmail.com</a>
      </div>
    </Layout>
  )
}
