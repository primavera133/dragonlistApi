import { Response } from 'express'
import adminConfig from '../../util/admin'
import validators from '../../util/validators/index'
import refs from '../../util/refs'
import { ISighting, ISightingFormData, ISightingFormRequest } from '../../types'

const postSighting = async (
  request: ISightingFormRequest,
  response: Response
): Promise<Response<ISighting> | Response<Error>> => {
  try {
    if (!request.user) throw new Error('user is missing')
    if (!request.user.email) throw new Error('email is missing')

    const newSighting: ISightingFormData = {
      country: request.body.country,
      date: request.body.date,
      region: request.body.region,
      specie: request.body.specie,
      email: request.user.email,
    }

    const { valid, errors } = await validators.validateSightingData(newSighting)

    const countryRef = await refs.getCountryRef(newSighting.country)
    if (countryRef) newSighting.countryRef = countryRef

    const regionRef = await refs.getRegionRef(newSighting.region)
    if (regionRef) newSighting.regionRef = regionRef

    const specieRef = await refs.getSpecieRef(newSighting.specie)
    if (specieRef) newSighting.specieRef = specieRef

    if (!valid) return response.status(400).json(errors)

    const doc = await adminConfig.db.collection('sightings').add(newSighting)

    return response.status(201).json({
      sightingId: doc.id,
      ...newSighting,
    })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ general: 'Something went wrong, please try again' })
  }
}

export default postSighting
