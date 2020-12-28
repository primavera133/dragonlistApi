import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { firebaseApp } from '../firebase'
import { AuthContext } from '../services/authContext'

export default function Navigation() {
  const { authUser, unfinishedProfile } = useContext(AuthContext)

  return (
    <div>
      {unfinishedProfile && <div>UNFINISHED PROFILE</div>}
      {!!authUser ? (
        <div>
          <p>{`Welcome, ${authUser.displayName}`}</p>
          <nav>
            <NavLink
              exact
              activeStyle={{
                fontWeight: 'bold',
              }}
              to={`/`}
            >
              Home
            </NavLink>{' '}
            |{' '}
            <NavLink
              exact
              activeStyle={{
                fontWeight: 'bold',
              }}
              to={`/test`}
            >
              Test
            </NavLink>{' '}
            |{' '}
            <NavLink
              exact
              activeStyle={{
                fontWeight: 'bold',
              }}
              to="/profile"
            >
              Profile
            </NavLink>
            | <a onClick={() => firebaseApp.auth().signOut()}>Logout</a>
          </nav>
        </div>
      ) : (
        <>
          <NavLink to="/signinemail">
            <button>Sign in with email</button>
          </NavLink>{' '}
        </>
      )}
    </div>
  )
}
