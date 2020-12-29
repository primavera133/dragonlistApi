import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faBars, faFileAlt } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'

import { firebaseApp } from '../firebase'
import { AuthContext } from '../services/authContext'
import Button from './Button'

export default function Navbar(props) {
  const { authUser, unfinishedProfile } = useContext(AuthContext)
  const [navbarOpen, setNavbarOpen] = useState(false)
  return (
    <>
      <nav
        css={[
          props.transparent ? tw`top-0 absolute z-50 w-full` : tw`relative shadow-lg bg-white shadow-lg`,
          tw`flex flex-wrap items-center justify-between px-2 py-3`,
        ]}
        className="navbar-expand-lg"
      >
        <div tw="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div tw="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              css={[
                props.transparent ? tw`text-white` : tw`text-gray-800`,
                tw`text-sm font-bold leading-relaxed inline-block mr-4 py-2  uppercase`,
              ]}
              className="whitespace-no-wrap"
              exact
              activeStyle={{}}
              to={`/`}
            >
              Dragonlist
            </NavLink>
            <button
              tw="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} css={[props.transparent ? tw`text-white` : tw`text-gray-800`]} />
            </button>
          </div>
          <div
            css={[
              tw`lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none`,
              navbarOpen ? tw`block rounded shadow-lg` : tw`hidden`,
            ]}
            id="example-navbar-warning"
          >
            <ul tw="flex flex-col lg:flex-row list-none mr-auto">
              <li tw="flex items-center">
                <NavLink
                  exact
                  to="/how-to"
                  css={[
                    props.transparent
                      ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                      : tw`text-gray-800 hover:text-gray-600`,
                    tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                  ]}
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    css={[props.transparent ? tw`lg:text-gray-300 text-gray-500` : tw`text-gray-500`, tw`text-lg mr-2`]}
                  />
                  How-to
                </NavLink>
              </li>
            </ul>
            <ul tw="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!!authUser && (
                <>
                  <li tw="flex items-center">
                    <NavLink
                      exact
                      activeStyle={{
                        fontWeight: 'bold',
                      }}
                      to="/profile"
                      css={[
                        props.transparent
                          ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                          : tw`text-gray-800 hover:text-gray-600`,
                        tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                      ]}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li tw="flex items-center">
                    |{' '}
                    <a
                      onClick={() => firebaseApp.auth().signOut()}
                      css={[
                        props.transparent
                          ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                          : tw`text-gray-800 hover:text-gray-600`,
                        tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                      ]}
                    >
                      Logout
                    </a>{' '}
                  </li>
                </>
              )}

              {/* <li tw="flex items-center">
                <NavLink
                  css={[
                    props.transparent
                      ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                      : tw`text-gray-800 hover:text-gray-600`,
                    tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                  ]}
                  to="#pablo"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    css={[props.transparent ? tw`lg:text-gray-300 text-gray-500` : tw`text-gray-500`, tw`text-lg`]}
                  />
                  <span tw="lg:hidden inline-block ml-2">Share</span>
                </NavLink>
              </li>

              <li tw="flex items-center">
                <NavLink
                  css={[
                    props.transparent
                      ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                      : tw`text-gray-800 hover:text-gray-600`,
                    tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                  ]}
                  to="#pablo"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    css={[props.transparent ? tw`lg:text-gray-300 text-gray-500` : tw`text-gray-500`, tw`text-lg`]}
                  />
                  <span tw="lg:hidden inline-block ml-2">Tweet</span>
                </NavLink>
              </li>

              <li tw="flex items-center">
                <NavLink
                  css={[
                    props.transparent
                      ? tw`lg:text-white lg:hover:text-gray-300 text-gray-800`
                      : tw`text-gray-800 hover:text-gray-600`,
                    tw`px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`,
                  ]}
                  to="#pablo"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    css={[props.transparent ? tw`lg:text-gray-300 text-gray-500` : tw`text-gray-500`, tw`text-lg`]}
                  />
                  <span tw="lg:hidden inline-block ml-2">Star</span>
                </NavLink>
              </li> */}
              {!authUser && (
                <>
                  <li tw="flex items-center">
                    <NavLink exact activeStyle={{ visibility: 'hidden' }} to={'/signin'}>
                      <Button isPrimary={props.transparent} isSecondary={!props.transparent} isSmall>
                        <FontAwesomeIcon icon={faSignInAlt} tw="mr-2" />
                        Sign in
                      </Button>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
