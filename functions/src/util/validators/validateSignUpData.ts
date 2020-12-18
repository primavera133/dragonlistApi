import { IUserSignupData, ISignupError, IValidatedResponse } from '../../types'
import { isEmpty } from './isEmpty'
import { isEmail } from './isEmail'

export const validateSignUpData = (data: IUserSignupData): IValidatedResponse<ISignupError> => {
  const errors: ISignupError = {}

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be valid email address'
  }

  if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty'
  if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty'
  if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty'
  if (isEmpty(data.country)) errors.country = 'Must not be empty'

  if (isEmpty(data.password)) errors.password = 'Must not be empty'
  if (isEmpty(data.username)) errors.username = 'Must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
