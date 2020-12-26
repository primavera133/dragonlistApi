import { Response } from 'express'
import { db } from '../../index'

import { IAuthedRequest } from '../../types'

type TUserDetailsResponse = {
  message: string
}

const updateUserDetails = async (
  request: IAuthedRequest,
  response: Response
): Promise<Response<TUserDetailsResponse> | Response<Error>> => {
  try {
    const document = db.collection('users').doc(`${request.user?.email}`)
    // TODO: validate body?
    await document.update(request.body)

    return response.json({ message: 'Updated successfully' })
  } catch (error) {
    console.error(error)
    return response.status(500).json({
      message: 'Cannot Update the value',
    })
  }
}

export default updateUserDetails
