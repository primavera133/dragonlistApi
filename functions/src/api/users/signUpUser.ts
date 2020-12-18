import firebase from 'firebase'
import { Request, Response } from 'express'

import adminConfig from '../../util/admin'
import validators from '../../util/validators/index'
import { IUserSignupData } from '../../types'

const signUpUser = async (request: Request, response: Response): Promise<void | Response<Error>> => {
  try {
    const newUser: IUserSignupData = {
      username: request.body.username,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      phoneNumber: request.body.phoneNumber,
      country: request.body.country,
      password: request.body.password,
    }

    const { valid, errors } = validators.validateSignUpData(newUser)

    if (!valid) return response.status(400).json(errors)

    const doc = await adminConfig.db.doc(`/users/${newUser.username}`).get()

    if (doc.exists) {
      return response.status(400).json({ username: 'this username is already taken' })
    }

    const data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)

    if (data.user === null) {
      throw new Error('Null user in data')
    }

    const userId = data.user.uid
    const token = await data.user.getIdToken()

    const userCredentials = {
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId,
      roles: ['user'],
    }
    await adminConfig.db.doc(`/users/${newUser.username}`).set(userCredentials)

    return response.status(201).json({ token, userData: userCredentials })
  } catch (err) {
    console.error(err)
    if (err.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: 'Email already in use' })
    } else {
      return response.status(500).json({ general: 'Something went wrong, please try again' })
    }
  }
}

export default signUpUser
