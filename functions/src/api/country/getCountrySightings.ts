import { Request, Response } from 'express'
import adminConfig from '../../util/admin'
import { ISighting } from '../../types'

const getCountrySightings = async (request: Request, response: Response): Promise<Response<ISighting[]> | Error> => {
  try {
    const sightings = await adminConfig.db
      .collection(`sightings`)
      .where('country', '==', request.params.countryId)
      .orderBy('date')
      .get()

    const sightingsItemList: ISighting[] = []

    for (const sighting of sightings.docs) {
      const sightingItem = sighting.data() as ISighting

      if (sightingItem.countryRef) {
        delete sightingItem.countryRef
      }
      if (sightingItem.regionRef) {
        delete sightingItem.regionRef
      }
      if (sightingItem.specieRef) {
        delete sightingItem.specieRef
      }
      if (sightingItem.userRef) {
        delete sightingItem.userRef
      }
      sightingsItemList.push(sightingItem)
    }

    return response.json(sightingsItemList)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}

export default getCountrySightings
