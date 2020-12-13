import firebase from 'firebase'
import admin from 'firebase-admin'
import { Request, Response } from 'express'

import { IUserLoginData } from '../../types'
import config from '../../config/firebaseConfig'
import adminConfig from '../../util/admin'

import validators from '../../util/validators/index'

firebase.initializeApp(config)

const loginUser = async (request: Request, response: Response): Promise<void | Response<Error>> => {
  try {
    const userLoginData: IUserLoginData = {
      email: request.body.email,
      password: request.body.password,
    }

    const { valid, errors } = validators.validateLoginData(userLoginData)
    if (!valid) return response.status(400).json(errors)

    const data = await firebase.auth().signInWithEmailAndPassword(userLoginData.email, userLoginData.password)

    if (!data.user) throw new Error('No user found')

    const token = await data.user.getIdToken()
    if (!token) throw new Error('No token found')

    const decodedToken = await admin.auth().verifyIdToken(token)

    const userData = (
      await adminConfig.db.collection('users').where('userId', '==', decodedToken.uid).limit(1).get()
    ).docs[0].data()

    return response.json({ token, userData })
  } catch (error) {
    console.error(error)
    return response.status(403).json({ general: 'wrong credentials, please try again' })
  }
}

export default loginUser
