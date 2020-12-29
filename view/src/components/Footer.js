import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import React from 'react'
import tw from 'twin.macro'

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
              <h4 tw="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 tw="text-lg mt-0 mb-2 text-gray-700">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div tw="mt-6">
                {/* <button
                  tw="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <i tw="flex fab fa-twitter"></i>
                </button>
                <button
                  tw="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <i tw="flex fab fa-facebook-square"></i>
                </button>
                <button
                  tw="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <i tw="flex fab fa-dribbble"></i>
                </button>
                <button
                  tw="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                  type="button"
                >
                  <i tw="flex fab fa-github"></i>
                </button> */}
              </div>
            </div>
            <div tw="w-full lg:w-6/12 px-4">
              <div tw="flex flex-wrap mb-6" className="items-top">
                <div tw="w-full lg:w-4/12 px-4 ml-auto">
                  <span tw="block uppercase text-gray-600 text-sm font-semibold mb-2">Useful Links</span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://blog.creative-tim.com"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free"
                      >
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div tw="w-full lg:w-4/12 px-4">
                  <span tw="block uppercase text-gray-600 text-sm font-semibold mb-2">Other Resources</span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        tw="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us"
                      >
                        Contact Us
                      </a>
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
                Copyright © {new Date().getFullYear()} Dragnolist by{' '}
                <a href="https://myrenas.se" tw="text-gray-600 hover:text-gray-900">
                  Jonas Myrenås
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
