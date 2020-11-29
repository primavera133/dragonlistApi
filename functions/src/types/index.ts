import * as firebase from 'firebase-admin'

export interface Country {
  countryId: string
  defaultLanguage: string
  name: string
  languages: string[]
  locale: string
  regions: firebase.firestore.DocumentReference
  createdAt: string
}

export interface UserLoginData {
  name?: string
  email: string
  password: string
}

export interface LoginError {
  email?: string
  password?: string
}

export interface UserSignupData {
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  country: string
  password: string
  confirmPassword: string
}

export interface SignupError {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  country?: string
  confirmPassword?: string
  username?: string
}

export interface ValidatedResponse {
  errors: LoginError
  valid: boolean
}
