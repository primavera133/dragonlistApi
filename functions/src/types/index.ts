import * as firebase from 'firebase-admin'
import { Request } from 'express'

export interface IRegion {}
export interface ICountry {
  countryId: string
  defaultLanguage: string
  name: string
  languages: string[]
  locale: string
  regions: IRegion[]
  regionsRefs?: firebase.firestore.DocumentReference[]
  createdAt: string
}

export interface IUserLoginData {
  name?: string
  email: string
  password: string
}

export interface ILoginError {
  email?: string
  password?: string
}

export interface IUserSignupData {
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  country: string
  password: string
  confirmPassword: string
}

export interface ISignupError {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  country?: string
  confirmPassword?: string
  username?: string
}

export interface IValidatedResponse {
  errors: ILoginError
  valid: boolean
}

export interface IUser {
  uid: string
  username?: string
  imageUrl?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  country?: string
  password?: string
  confirmPassword?: string
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser
  rawBody?: any
}
