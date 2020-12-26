import { Response } from 'express'
import { db } from '../../index'
import validators from '../../util/validators/index'
import { IAuthedRequest } from '../../types'

const postUser = async (request: IAuthedRequest, response: Response): Promise<void | Response<Error>> => {
  try {
    if (request.body.email !== request?.user?.email) {
      return response.status(400).json({ error: 'not allowed to post other users' })
    }

    const newUser: any = {
      email: request.body.email,
    }
    Object.keys(request.body).forEach((key) => (newUser[key] = request.body[key]))

    const { valid, errors } = validators.validateSignUpData(newUser)

    if (!valid) return response.status(400).json(errors)

    const doc = await db.doc(`/users/${newUser.email}`).get()

    if (doc.exists) {
      return response.status(400).json({ email: 'this email is already taken' })
    }

    await db.doc(`/users/${newUser.email}`).set({
      ...newUser,
      roles: ['user'],
    })

    return response.status(201).json({ userData: newUser })
  } catch (err) {
    console.error(err)
    if (err.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: 'Email already in use' })
    } else {
      return response.status(500).json({ general: 'Something went wrong, please try again' })
    }
  }
}

export default postUser
