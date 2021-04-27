import { Response } from 'express'

import { db } from '../../index'

import validators from '../../util/validators/index'
import { IObservation, IObservationFormData, IAuthRequest, IUser } from '../../types'

const postObservation = async (
  request: IAuthRequest,
  response: Response
): Promise<Response<IObservation> | Response<Error>> => {
  try {
    if (!request.user) throw new Error('user is missing')
    if (!request.user.email) throw new Error('email is missing')

    const { observationId } = request.params
    const observationRef = db.doc(`/observations/${observationId}`)
    const observationDoc = await observationRef.get()
    const { country: oldCountry, region: oldRegion } = observationDoc.data() as IObservation

    const observationFormData: IObservationFormData = {
      country: request.body.country,
      observationDate: request.body.observationDate,
      specie: request.body.specie,
      email: request.user.email,
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

    await observationRef.update(observationFormData)

    const userDocumentRef = db.collection('users').doc(`${request.user?.email}`)
    const userDataDoc = await userDocumentRef.get()
    if (!userDataDoc.exists) {
      return response.status(400).json({ message: 'user not found' })
    }
    const userData = userDataDoc.data() as IUser

    let { observationsCount } = userData
    const { country, region } = observationFormData

    if (country !== oldCountry || region !== oldRegion) {
      if (!observationsCount) {
        observationsCount = {}
      }
      // first reduce old calculations
      if (oldRegion) {
        observationsCount[oldCountry][oldRegion] = observationsCount[oldCountry][oldRegion] - 1
      }
      observationsCount[oldCountry] = {
        ...observationsCount[oldCountry],
        total: observationsCount[oldCountry].total - 1,
      }

      // add new calculations
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
    }
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
