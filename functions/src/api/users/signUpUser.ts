import firebase from 'firebase'
import { Request, Response } from 'express'
import { db } from '../../index'
import validators from '../../util/validators/index'
import { IUserSignupData } from '../../types'

//Deprecated?
const signUpUser = async (request: Request, response: Response): Promise<void | Response<Error>> => {
  try {
    const newUser: IUserSignupData = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    }

    const { valid, errors } = validators.validateSignUpData(newUser)

    if (!valid) return response.status(400).json(errors)

    const doc = await db.doc(`/users/${newUser.email}`).get()

    if (doc.exists) {
      return response.status(400).json({ email: 'this email is already taken' })
    }

    const data = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password || '')

    if (data.user === null) {
      throw new Error('Null user in data')
    }

    const userId = data.user.uid
    const token = await data.user.getIdToken()

    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId,
      roles: ['user'],
    }
    await db.doc(`/users/${newUser.email}`).set(userCredentials)

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
