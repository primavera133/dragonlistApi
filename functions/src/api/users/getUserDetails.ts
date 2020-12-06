import { Response } from 'express'
import { IGetUserAuthInfoRequest, IUser } from '../../types'
import adminConfig from '../../util/admin'

interface IUserData {
  userCredentials?: IUser
}

const getUserDetails = async (
  request: IGetUserAuthInfoRequest,
  response: Response
): Promise<Response<IUserData> | Response<Error>> => {
  try {
    const userData: IUserData = {}
    const doc = await adminConfig.db.doc(`/users/${request.user?.username}`).get()

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
