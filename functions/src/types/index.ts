import { Request } from 'express'

export interface IRegion {
  name: string
}

export type TRegionName = string

export interface ICountry {
  countryId: string
  defaultLanguage: string
  name: string
  languages: string[]
  locale: string
  regions: TRegionName[]
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
  email: string
  firstName?: string
  lastName?: string
  password?: string
}

export interface ISignupError {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  country?: string
}

export interface IValidatedResponse<T> {
  errors: T
  valid: boolean
}

export interface IUser {
  uid: string
  roles?: string[]
  imageUrl?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  country?: string
  password?: string
}

export interface IAuthedRequest extends Request {
  user?: IUser
  rawBody?: any
}

export interface ISpecie {
  id: string
  sc_name: string
}

export interface IObservation {
  country: string
  countryRef?: FirebaseFirestore.DocumentReference<ICountry>
  countryData?: ICountry
  observationDate: Date
  observationDateStr?: string
  region?: string
  specie: string
  userData?: IUser
}
export interface IObservationFormData {
  country: string
  observationDate: number
  observationDateStr?: string
  region?: string
  specie: string
  email: string
}

export interface IObservationFormRequest extends Request {
  user?: IUser
}

export interface IObservationFormError {
  country?: string
  observationDate?: string
  region?: string
  specie?: string
}

export interface IMember {
  imageUrl?: string
  contactEmail?: string
  contactPhone?: string
  firstName?: string
  lastName?: string
  residentCountry?: string
  residentRegion?: string
}
