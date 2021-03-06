import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import tw from 'twin.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward,
  faFingerprint,
  faMapPin,
  faMapSigns,
  faSignInAlt,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { Trans } from '@lingui/macro'

import configApi from '../../api/config'
import { AuthContext } from '../../services/authContext'

import Navbar from '../../components/Navbar/Navbar.js'
import Footer from '../../components/Footer/Footer.js'
import Link from '../../components/Link/Link'
import Button from '../../components/Button/Button'

const getHeroBg = () => {
  const images = [
    "url('https://images.unsplash.com/photo-1496922117019-9ab8bce6a87b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')",
    "url('https://images.unsplash.com/photo-1508891667025-60eda50c13fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80')",
    // "url('https://images.unsplash.com/photo-1444077573576-3751140962c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80')",
  ]
  return images[Math.floor(Math.random() * images.length)]
}

const homePage = ({ history }) => {
  const { authUser, unfinishedProfile } = useContext(AuthContext)
  useQuery('countries', configApi.getCountries)
  return (
    <>
      <Navbar transparent />

      <div
        tw="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: '75vh',
        }}
      >
        <div
          tw="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: getHeroBg(),
          }}
        >
          <span id="blackOverlay" tw="w-full h-full absolute opacity-75 bg-dlblue"></span>
        </div>
        <div tw="container relative mx-auto">
          <div tw="items-center flex flex-wrap">
            <div tw="w-full lg:w-8/12 px-4 ml-auto mr-80 text-center">
              <div tw="">
                <h1 tw="text-white font-semibold text-5xl lg:text-6xl">
                  <Trans>Record your dragonfly observations and find like-minded new friends.</Trans>
                </h1>
                <p tw="mt-4 text-lg text-white">
                  <Trans>
                    This site is all about sharing lists and finding friends. Keeping lists is fun and why not have fun
                    with other like minded?
                  </Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          tw="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: '70px', transform: 'translateZ(0)' }}
        >
          <svg
            tw="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon tw="text-dlwhite fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>

      <section tw="pb-20 bg-dlwhite -mt-24">
        <div tw="container mx-auto px-4">
          <div tw="flex flex-wrap">
            <div tw="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div tw="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div tw="px-4 py-5 flex-auto">
                  <div tw="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-dlbrown">
                    <FontAwesomeIcon icon={faMapPin} />
                  </div>
                  <h6 tw="text-xl font-semibold">
                    <Trans>Put a pin on what you've seen</Trans>
                  </h6>
                  <p tw="mt-2 mb-4 text-gray-600">
                    <Trans>
                      Record where you first saw a specie in a country, or where your first observation in a region of
                      your country.
                    </Trans>
                  </p>
                </div>
              </div>
            </div>

            <div tw="w-full md:w-4/12 px-4 text-center">
              <div tw="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div tw="px-4 py-5 flex-auto">
                  <div tw="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-dlearthy">
                    <FontAwesomeIcon icon={faAward} />
                  </div>
                  <h6 tw="text-xl font-semibold">
                    <Trans>Who saw most?</Trans>
                  </h6>
                  <p tw="mt-2 mb-4 text-gray-600">
                    <Trans>Top 10 lists per country. Or per region of your country.</Trans>
                  </p>
                </div>
              </div>
            </div>

            <div tw="pt-6 w-full md:w-4/12 px-4 text-center">
              <div tw="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div tw="px-4 py-5 flex-auto">
                  <div tw="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-dlbrown">
                    <FontAwesomeIcon icon={faMapSigns} />
                  </div>
                  <h6 tw="text-xl font-semibold">
                    <Trans>Find local help</Trans>
                  </h6>
                  <p tw="mt-2 mb-4 text-gray-600">
                    <Trans>
                      Traveling to a new region? Want some advice on good places or where to find a special specie? Why
                      not ask someone who saw it before?
                    </Trans>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div tw="flex flex-wrap items-center mt-32">
            <div tw="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <h3 tw="text-3xl mb-2 font-semibold leading-normal">
                <Trans>What is this website?</Trans>
              </h3>
              <p tw="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                <Trans>
                  This is a project made mainly for fun. For the fun of listing your observations. For the fun of
                  comparing your lists and for the fun of finding a companion when you are in need of local guidance.
                </Trans>
              </p>
              <h4 tw="text-xl mb-2 font-semibold leading-normal">
                <Trans>What is this not?</Trans>
              </h4>
              <p tw="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                <Trans>
                  This is not citizen-science. You probably don't want to record every single observation in our
                  database. There are better tools for that. See our <Link to="/">list of related services</Link> for
                  those.
                </Trans>
              </p>
              {!authUser && (
                <div tw="flex flex-col justify-center">
                  <Button isSecondary tw="mx-auto my-4">
                    <FontAwesomeIcon icon={faSignInAlt} tw="mr-2" />
                    <Trans>Sign in</Trans>
                  </Button>
                  <p tw="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                    <Trans>
                      This is a project made mainly for fun. For the fun of listing your observations. For the fun of
                      comparing your lists and for the fun of finding a companion when you are in need of local
                      guidance.
                    </Trans>
                  </p>
                </div>
              )}
            </div>

            <div tw="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div tw="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-dlearthy">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1586508217007-6e8b3151a6f2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                  tw="w-full align-middle rounded-t-lg"
                />
                <blockquote tw="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    tw="absolute left-0 w-full block"
                    style={{
                      height: '95px',
                      top: '-94px',
                    }}
                  >
                    <polygon points="-30,95 583,95 583,65" tw="text-dlearthy fill-current"></polygon>
                  </svg>
                  <h4 tw="text-xl font-bold text-white">
                    <FontAwesomeIcon icon={faUserFriends} tw="mr-2" />
                    <Trans>Who made this?</Trans>
                  </h4>
                  <p tw="text-base font-light mt-2 text-white">
                    <Trans>
                      This site was made by some members of{' '}
                      <a
                        tw="underline"
                        href="http://www.trollslandeforeningen.se/"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Trollslände&shy;föreningen
                      </a>
                      , the Swedish dragonfly society.
                    </Trans>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default homePage
