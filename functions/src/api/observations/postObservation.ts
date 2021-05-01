import { Response } from 'express'

import { db } from '../../index'

import validators from '../../util/validators/index'
import { IObservation, IObservationFormData, IAuthRequest } from '../../types'

const postObservation = async (
  request: IAuthRequest,
  response: Response
): Promise<Response<IObservation> | Response<Error>> => {
  try {
    if (!request.user) throw new Error('user is missing')
    if (!request.user.email) throw new Error('email is missing')

    const newObservation: IObservationFormData = {
      country: request.body.country,
      email: request.user.email,
      name: `${request.user.firstName} ${request.user.lastName}`,
      observationDate: request.body.observationDate,
      specie: request.body.specie,
    }
    if (request.body.region) {
      newObservation.region = request.body.region
    }

    const { valid, errors } = await validators.validateObservationData(newObservation)

    newObservation.observationDateStr = new Date(request.body.observationDate).toString()

    if (!valid) return response.status(400).json(errors)

    const { id: observationId } = await db.collection('observations').add(newObservation)

    return response.status(201).json({
      observationId,
      ...newObservation,
    })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ general: 'Something went wrong, please try again' })
  }
}

export default postObservation
