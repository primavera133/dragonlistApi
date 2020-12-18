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
  regionsRefs?: FirebaseFirestore.DocumentReference[]
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
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  country: string
  password: string
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
  countryRef?: FirebaseFirestore.DocumentReference<ICountry>
  countryData?: ICountry
  date: Date
  region?: string
  regionRef?: FirebaseFirestore.DocumentReference<IRegion>
  regionData?: IRegion
  specie: string
  specieRef?: FirebaseFirestore.DocumentReference<ISpecie>
  specieData?: ISpecie
  userRef?: FirebaseFirestore.DocumentReference<IUser>
  userData?: IUser
}
export interface ISightingFormData {
  country: string
  countryRef?: FirebaseFirestore.DocumentReference<ICountry>
  date: number
  region: string
  regionRef?: FirebaseFirestore.DocumentReference<IRegion>
  specie: string
  specieRef?: FirebaseFirestore.DocumentReference<ISpecie>
  email: string
}

export interface ISightingFormRequest extends Request {
  user?: IUser
}

export interface ISightingFormError {
  country?: string
  date?: string
  region?: string
  specie?: string
}
