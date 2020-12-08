import { ISightingFormData, ISightingFormError, IValidatedResponse } from '../../types'
import { isEmpty } from './isEmpty'
import { isCountry } from './isCountry'
import { isDate } from './isDate'
import { isRegion } from './isRegion'
import { isSpecie } from './isSpecie'

export const validateSightingData = async (
  data: ISightingFormData
): Promise<IValidatedResponse<ISightingFormError>> => {
  const errors: ISightingFormError = {}

  if (isEmpty(data.country)) {
    errors.country = 'Must not be empty'
  } else if (!(await isCountry(data.country))) {
    errors.country = 'Must be valid country'
  }

  if (isEmpty(data.date)) {
    errors.date = 'Must not be empty'
  } else if (!(await isDate(data.date))) {
    errors.date = 'Must be valid date'
  }

  if (isEmpty(data.region)) {
    errors.region = 'Must not be empty'
  } else if (!(await isRegion(data.region))) {
    errors.region = 'Must be valid region'
  }

  if (isEmpty(data.specie)) {
    errors.specie = 'Must not be empty'
  } else if (!(await isSpecie(data.specie))) {
    errors.specie = 'Must be valid specie'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
