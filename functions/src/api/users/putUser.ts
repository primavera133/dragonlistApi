import { Response } from 'express'
import { db } from '../../index'
// import validators from '../../util/validators/index'
import { IAuthedRequest, IUser } from '../../types'

const putUser = async (request: IAuthedRequest, response: Response): Promise<void | Response<Error>> => {
  try {
    const userDetails: IUser = {
      ...request.body,
      email: request?.user?.email,
    }

    // TODO: Secure user details
    // const { valid, errors } = validators.validateSignUpData(userDetails)
    // if (!valid) return response.status(400).json(errors)

    const doc = db.collection('users').doc(`${request.user?.email}`)
    const userData = await doc.get()

    if (!userData.exists) {
      return response.status(400).json({ message: 'user not found' })
    }

    const updatedDetails = {
      ...userData.data(),
      ...userDetails,
    }

    await doc.update(updatedDetails)

    return response.status(201).json({ userData: updatedDetails })
  } catch (err) {
    console.error(err)
    if (err.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: 'Email already in use' })
    } else {
      return response.status(500).json({ general: 'Something went wrong, please try again' })
    }
  }
}

export default putUser
