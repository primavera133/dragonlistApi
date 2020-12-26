import { Response } from 'express'
import { IAuthedRequest, IUser } from '../../types'
import { db } from '../../index'

const deleteUser = async (request: IAuthedRequest, response: Response): Promise<void | Response<Error>> => {
  try {
    const userSnapshot = await db.doc(`/users/${request.params.email}`).get()

    if (!userSnapshot.exists) {
      return response.status(500).json({ message: `User ${request.params.email} not found` })
    }
    const user = userSnapshot.data() as IUser
    if (user.roles?.includes('admin')) {
      return response.status(500).json({ message: `User ${request.params.email} is an admin` })
    }

    await db.doc(`/users/${request.params.email}`).delete()

    return response.json({ message: `User ${request.params.email} deleted` })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: error.code })
  }
}

export default deleteUser
