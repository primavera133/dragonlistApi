import { IObservationFormData, IObservationFormError, IValidatedResponse } from '../../types'
import { isEmpty } from './isEmpty'
import { isCountry } from './isCountry'
import { isDate } from './isDate'
import { isRegion } from './isRegion'
import { isSpecie } from './isSpecie'

export const validateObservationData = async (
  data: IObservationFormData
): Promise<IValidatedResponse<IObservationFormError>> => {
  const errors: IObservationFormError = {}

  if (isEmpty(data.country)) {
    errors.country = 'Must not be empty'
  } else if (!(await isCountry(data.country))) {
    errors.country = 'Must be valid country'
  }

  if (isEmpty(data.observationDate)) {
    errors.observationDate = 'Must not be empty'
  } else if (!(await isDate(data.observationDate))) {
    errors.observationDate = 'Must be valid date'
  }

  if (data.region && !(await isRegion(data.country, data.region))) {
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
