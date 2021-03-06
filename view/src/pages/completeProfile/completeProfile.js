import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from 'react'

import { withI18n } from '@lingui/react'
import { t, Trans } from '@lingui/macro'

const completeProfile = ({}) => {
  const [isComplete, setIsComplete] = useState(false)

  return <div>UNFINISHED PROFILE</div>
}

export default withI18n()(completeSignInPage)
