import { Response } from 'express'
import { IAuthedRequest, IUser } from '../../types'
import { db } from '../../index'

interface IUserData {
  userCredentials?: IUser
}

const getUserDetails = async (
  request: IAuthedRequest,
  response: Response
): Promise<Response<IUserData> | Response<Error>> => {
  try {
    const userData: IUserData = {}
    const doc = await db.doc(`/users/${request.user?.email}`).get()

    if (!doc.exists) {
      throw new Error('Doc does not exist')
    }
    userData.userCredentials = doc.data() as IUser
    return response.json(userData)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: error.code })
  }
}

export default getUserDetails
