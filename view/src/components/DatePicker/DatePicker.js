import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import {
  DatePicker,
  DatePickerInput,
  DatePickerCalendar,
  DatePickerButton,
  DatePickerMonth,
  DatePickerTable,
} from '@reecelucas/react-datepicker'
import { withI18n } from '@lingui/react'
import tw, { styled } from 'twin.macro'
import { t, Trans } from '@lingui/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './datePicker.scss'

export const DatePickerComponent = withI18n()(({ onSelectDate }) => (
  <>
    <label htmlFor="observationDate">
      <Trans>Observation date</Trans>
    </label>
    <DatePicker onSelect={onSelectDate} tw="flex items-start flex-col">
      <DatePickerInput
        dateFormat={'yyyy-MM-dd'}
        id="observationDate"
        tw="mt-1 px-4 py-3 block w-full rounded border-gray-300 border focus:outline-none focus:ring focus:border-blue-300 disabled:text-gray-500"
      />

      <DatePickerCalendar tw="bg-white p-4 mt-16 absolute z-10 border shadow">
        <div tw="pb-4 flex items-center">
          <DatePickerButton updateMonth={({ prev }) => prev()}>
            <FontAwesomeIcon icon={faArrowLeft} focusable={false} />
            <span tw="sr-only">
              <Trans>Previous Month</Trans>
            </span>
          </DatePickerButton>
          <DatePickerMonth dateFormat={'MMMM, yyyy'} tw="flex-grow text-center" />
          <DatePickerButton updateMonth={({ next }) => next()}>
            <FontAwesomeIcon icon={faArrowRight} focusable={false} />
            <span tw="sr-only">
              <Trans>Next Month</Trans>
            </span>
          </DatePickerButton>
        </div>
        <DatePickerTable className="dp-table" />
      </DatePickerCalendar>
    </DatePicker>
  </>
))
