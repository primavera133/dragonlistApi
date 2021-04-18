import { Response } from 'express'

import { db } from '../../index'
import firebase from 'firebase'

import validators from '../../util/validators/index'
import { IObservation, IObservationFormData, IObservationFormRequest, IUser } from '../../types'

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

    const { id: observationId } = await db.collection('observations').add(newObservation)

    const userDocumentRef = db.collection('users').doc(`${request.user?.email}`)
    const userDataDoc = await userDocumentRef.get()
    if (!userDataDoc.exists) {
      return response.status(400).json({ message: 'user not found' })
    }
    const userData = userDataDoc.data() as IUser

    let { observationsCount } = userData
    const { country, region } = newObservation

    if (!observationsCount) {
      observationsCount = {}
    }

    if (!observationsCount[country]) {
      observationsCount[country] = {
        total: 1,
      }
    } else {
      observationsCount[country].total = observationsCount[country].total + 1
    }

    if (region) {
      observationsCount[country][region] = (observationsCount[country][region] ?? 0) + 1
    }

    await userDocumentRef.update({
      ...userData,
      observationsCount,
    })

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
