import firebase from 'firebase'
import { Request, Response } from 'express'

import { UserLoginData } from '../../types'
import config from '../../config/firebaseConfig'

firebase.initializeApp(config)

import validators from '../../util/validators/index'

type UserResponse = {
  token: string
}

const loginUser = async (request: Request, response: Response): Promise<Response<UserResponse> | Error> => {
  try {
    const userLoginData: UserLoginData = {
      email: request.body.email,
      password: request.body.password,
    }

    const { valid, errors } = validators.validateLoginData(userLoginData)
    if (!valid) return response.status(400).json(errors)

    const data = await firebase.auth().signInWithEmailAndPassword(userLoginData.email, userLoginData.password)

    if (!data.user) throw new Error('No user found')

    const token = await data.user.getIdToken()
    if (!token) throw new Error('No token found')

    return response.json({ token })
  } catch (error) {
    console.error(error)
    return response.status(403).json({ general: 'wrong credentials, please try again' })
  }
}

export default loginUser
