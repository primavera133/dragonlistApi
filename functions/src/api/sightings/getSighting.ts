import { Request, Response } from 'express'
import { db } from '../../index'
import { ISighting } from '../../types'

const getSighting = async (request: Request, response: Response): Promise<Response<ISighting[]> | Error> => {
  try {
    const dbResponse = await db.doc(`/sightings/${request.params.sightingId}`).get()
    const sightingItem: ISighting = dbResponse.data() as ISighting

    if (sightingItem.countryRef) {
      const country = await sightingItem.countryRef.get()
      sightingItem.countryData = country.data()
      if (sightingItem.countryData?.regionsRefs) delete sightingItem.countryData.regionsRefs
      delete sightingItem.countryRef
    }

    if (sightingItem.regionRef) {
      const region = await sightingItem.regionRef.get()
      sightingItem.regionData = region.data()
      delete sightingItem.regionRef
    }

    if (sightingItem.specieRef) {
      const specie = await sightingItem.specieRef.get()
      sightingItem.specieData = specie.data()
      delete sightingItem.specieRef
    }

    if (sightingItem.userRef) {
      const user = await sightingItem.userRef.get()
      sightingItem.userData = user.data()
      delete sightingItem.userRef
    }

    return response.json(sightingItem)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getSighting
