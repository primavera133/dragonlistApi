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

    const { observationId } = request.params

    const observation = await db.collection('observations').doc(observationId).get()

    if (!observation.exists) {
      return response.status(400).json(new Error('observation not found'))
    }

    const { region: oldRegion } = observation.data() as IObservation

    const observationFormData: IObservationFormData = {
      country: request.body.country,
      email: request.user.email,
      name: `${request.user.firstName} ${request.user.lastName}`,
      observationDate: request.body.observationDate,
      specie: request.body.specie,
    }
    if (request.body.region) {
      observationFormData.region = request.body.region
    }
    if (!request.body.region && oldRegion) {
      observationFormData.region = null
    }

    const { valid, errors } = await validators.validateObservationData(observationFormData)

    observationFormData.observationDateStr = new Date(request.body.observationDate).toString()

    if (!valid) return response.status(400).json(errors)

    await db.collection('observations').doc(observationId).update(observationFormData)

    return response.status(201).json({
      observationId,
      ...observationFormData,
    })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ general: 'Something went wrong, please try again' })
  }
}

export default postObservation
