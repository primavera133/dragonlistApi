import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import userApi from '../../api/user'
import { AuthContext } from '../../services/authContext'

import React, { useEffect, useState, useContext } from 'react'
import tw, { styled } from 'twin.macro'
import Layout from '../../components/Layout/Layout'
import Loader from '../../components/Loader/Loader'

const UserCard = styled.div(() => [tw`rounded-lg shadow max-w-lg my-3 bg-white`, 'min-width: 20rem'])
const UserImg = styled.img(() => [
  tw`rounded-full -mt-16 m-4 border-solid border-white border-2`,
  'width: 10rem',
  'height: 10rem',
])

const profilePage = ({ history }) => {
  const { unfinishedProfile } = useContext(AuthContext)

  const [userData, setUserData] = useState()

  useEffect(async () => {
    try {
      const result = await userApi.getUser()
      setUserData(result.userCredentials)
    } catch (error) {
      console.error(error)
      history.push('/signin')
    }
  }, [])

  useEffect(() => {
    if (unfinishedProfile) {
      history.push('/completeProfile')
    }
  }, [unfinishedProfile])

  return (
    <Layout>
      {userData ? (
        <UserCard>
          <div tw="flex justify-center items-center">
            <UserImg src={userData.imageUrl} />
          </div>
          <div tw="text-center px-3 pb-6 pt-2">
            {userData.roles.includes('admin') ? <h4>Admin</h4> : null}
            <h3 tw="text-black text-sm font-sans">
              {userData.firstName} {userData.lastName}
            </h3>
            <div tw="mt-2 font-sans font-light text-gray-500">
              <ul>
                <li>Resident country: {userData.country}</li>
                <li>
                  email: <a href={`mailto:${userData.email}`}>{userData.email}</a>
                </li>
                <li>
                  phone: <a href={`tel:${userData.phoneNumber}`}>{userData.phoneNumber}</a>
                </li>
                <li>userId: {userData.userId}</li>
              </ul>
            </div>
          </div>
        </UserCard>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

export default profilePage
