import * as firebase from 'firebase-admin'
import { Request } from 'express'

export interface IRegion {
  name: string
}
export interface ICountry {
  countryId: string
  defaultLanguage: string
  name: string
  languages: string[]
  locale: string
  regions: IRegion[]
  regionsRefs?: firebase.firestore.DocumentReference[]
  regionsData?: IRegion[]
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
  roles?: string[]
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

export interface ISpecie {
  id: string
  sc_name: string
}

export interface ISighting {
  country: string
  countryRef?: firebase.firestore.DocumentReference<ICountry>
  countryData: ICountry
  date: Date
  region?: string
  regionRef?: firebase.firestore.DocumentReference
  regionData?: IRegion
  specie: string
  specieRef?: firebase.firestore.DocumentReference<ISpecie>
  specieData?: ISpecie
  userId: string
  userRef?: firebase.firestore.DocumentReference<IUser>
  userData?: IUser
}
