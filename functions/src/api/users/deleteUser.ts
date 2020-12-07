import { Response } from 'express'
import { IGetUserAuthInfoRequest, IUser } from '../../types'
import adminConfig from '../../util/admin'

const deleteUser = async (request: IGetUserAuthInfoRequest, response: Response): Promise<void | Response<Error>> => {
  try {
    const userSnapshot = await adminConfig.db.doc(`/users/${request.params.username}`).get()

    if (!userSnapshot.exists) {
      return response.status(500).json({ message: `User ${request.params.username} not found` })
    }
    const user = userSnapshot.data() as IUser
    if (user.roles?.includes('admin')) {
      return response.status(500).json({ message: `User ${request.params.username} is an admin` })
    }

    await adminConfig.db.doc(`/users/${request.params.username}`).delete()

    return response.json({ message: `User ${request.params.username} deleted` })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: error.code })
  }
}

export default deleteUser
