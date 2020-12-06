import { Response } from 'express'
import adminConfig from '../../util/admin'

import { IGetUserAuthInfoRequest } from '../../types'

type TUserDetailsResponse = {
  message: string
}

const updateUserDetails = async (
  request: IGetUserAuthInfoRequest,
  response: Response
): Promise<Response<TUserDetailsResponse> | Response<Error>> => {
  try {
    const document = adminConfig.db.collection('users').doc(`${request.user?.username}`)
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
