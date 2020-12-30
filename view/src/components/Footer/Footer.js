import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw from 'twin.macro'
import { Trans } from '@lingui/macro'

import BlackLink from '../../components/Link/BlackLink'
import ExternalBlackLink from '../../components/Link/ExternalBlackLink'

export default function Footer() {
  return (
    <>
      <footer tw="relative bg-dlumbra pt-8 pb-6">
        <div
          tw="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: '80px', transform: 'translateZ(0)' }}
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
            <polygon tw="text-dlumbra fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <div tw="container mx-auto px-4">
          <div tw="flex flex-wrap">
            <div tw="w-full lg:w-6/12 px-4">
              <h4 tw="text-xl italic">
                <Trans>If you are old and wish to be young again, try and identify a dragonfly! - Simon Barres</Trans>
              </h4>
            </div>
            <div tw="w-full lg:w-6/12 px-4">
              <div tw="flex flex-wrap mb-6" className="items-top">
                <div tw="w-full lg:w-4/12 px-4 ml-auto">
                  <span tw="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    <Trans>Useful Links</Trans>
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <ExternalBlackLink href="https://www.inaturalist.org/">
                        <Trans>iNaturalist</Trans>
                      </ExternalBlackLink>
                    </li>
                    <li>
                      <ExternalBlackLink href="https://www.gbif.org/">
                        <Trans>GBIF</Trans>
                      </ExternalBlackLink>
                    </li>
                    <li>
                      <ExternalBlackLink href="https://www.iucnredlist.org/">
                        <Trans>IUCN Red List</Trans>
                      </ExternalBlackLink>
                    </li>
                    <li>
                      <ExternalBlackLink href="http://www.trollslandeforeningen.se/">
                        <Trans>Trollsländeföreningen</Trans>
                      </ExternalBlackLink>
                    </li>
                  </ul>
                </div>
                <div tw="w-full lg:w-4/12 px-4">
                  <span tw="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    <Trans>Other Resources</Trans>
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <BlackLink to="/termsandconditions">
                        <Trans>Terms & Conditions</Trans>
                      </BlackLink>
                    </li>
                    <li>
                      <BlackLink to="/privacypolicy">
                        <Trans>Privacy Policy</Trans>
                      </BlackLink>
                    </li>
                    <li>
                      <BlackLink tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm" to="/contact">
                        <Trans>Contact Us</Trans>
                      </BlackLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr tw="my-6 border-gray-400" />
          <div tw="flex flex-wrap items-center md:justify-between justify-center">
            <div tw="w-full md:w-4/12 px-4 mx-auto text-center">
              <div tw="text-sm text-gray-600 font-semibold py-1">
                <Trans>
                  {new Date().getFullYear()} Dragonlist by{' '}
                  <ExternalBlackLink href="https://myrenas.se">Jonas Myrenås</ExternalBlackLink>
                  {`, `}
                  <ExternalBlackLink href="https://www.github.com/primavera133">Github</ExternalBlackLink>.
                </Trans>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
