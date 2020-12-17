import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import userApi from '../api/user'

import React, { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'
import user from '../api/user'

const UserCard = styled.div(() => [tw`rounded-lg shadow max-w-lg my-3 bg-white`, 'min-width: 20rem'])
const UserImg = styled.img(() => [
  tw`rounded-full -mt-16 m-4 border-solid border-white border-2`,
  'width: 10rem',
  'height: 10rem',
])

const profilePage = ({ history }) => {
  const [userData, setUserData] = useState()
  const [userImageUrl, setUserImageUrl] = useState()
  useEffect(async () => {
    const result = await userApi.getUser()
    console.log(result)
    setUserData(result.userCredentials)
  }, [])

  return userData ? (
    <div>
      <div css={[tw`flex flex-col items-center justify-center h-screen`, tw`bg-gradient-to-b from-electric to-ribbon`]}>
        <div tw="flex flex-col justify-center h-full space-y-5">
          <UserCard>
            <div tw="flex justify-center items-center">
              <UserImg src={userData.imageUrl} />
            </div>
            <div tw="text-center px-3 pb-6 pt-2">
              {userData.roles.includes('admin') ? <h4>Admin</h4> : null}
              <h3 tw="text-black text-sm font-sans">{userData.username}</h3>
              <p tw="mt-2 font-sans font-light text-gray-500">
                <ul>
                  <li>
                    {userData.firstName} {userData.lastName}
                  </li>
                  <li>Resident country: {userData.country}</li>
                  <li>
                    email: <a href={`mailto:${userData.email}`}>{userData.email}</a>
                  </li>
                  <li>
                    phone: <a href={`tel:${userData.phoneNumber}`}>{userData.phoneNumber}</a>
                  </li>
                  <li>userId: {userData.userId}</li>
                </ul>
              </p>
            </div>
          </UserCard>
        </div>
      </div>
    </div>
  ) : null
}

export default profilePage
