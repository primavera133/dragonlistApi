import { UserLoginData, LoginError, ValidatedResponse } from '../../types'
import { isEmpty } from './isEmpty'

export const validateLoginData = (data: UserLoginData): ValidatedResponse => {
  const errors: LoginError = {}
  if (isEmpty(data.email)) errors.email = 'Must not be empty'
  if (isEmpty(data.password)) errors.password = 'Must not be empty'
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
