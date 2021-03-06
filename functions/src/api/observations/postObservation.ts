import { Response } from 'express'
import { db } from '../../index'
import validators from '../../util/validators/index'
import { IObservation, IObservationFormData, IObservationFormRequest } from '../../types'

const postObservation = async (
  request: IObservationFormRequest,
  response: Response
): Promise<Response<IObservation> | Response<Error>> => {
  try {
    if (!request.user) throw new Error('user is missing')
    if (!request.user.email) throw new Error('email is missing')

    const newObservation: IObservationFormData = {
      country: request.body.country,
      observationDate: request.body.observationDate,
      specie: request.body.specie,
      email: request.user.email,
    }
    if (request.body.region) {
      newObservation.region = request.body.region
    }

    const { valid, errors } = await validators.validateObservationData(newObservation)

    newObservation.observationDateStr = new Date(request.body.observationDate).toString()

    if (!valid) return response.status(400).json(errors)

    const doc = await db.collection('observations').add(newObservation)

    return response.status(201).json({
      observationId: doc.id,
      ...newObservation,
    })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ general: 'Something went wrong, please try again' })
  }
}

export default postObservation
