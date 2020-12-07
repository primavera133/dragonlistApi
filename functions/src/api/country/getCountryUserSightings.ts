import { Request, Response } from 'express'
import adminConfig from '../../util/admin'
import { ISighting } from '../../types'

const getCountryUserSightings = async (
  request: Request,
  response: Response
): Promise<Response<ISighting[]> | Error> => {
  try {
    const sightingsQuery = await adminConfig.db.collection(`sightings`)

    sightingsQuery.where('country', '==', request.params.countryId)
    sightingsQuery.where('user', '==', request.params.username)
    sightingsQuery.orderBy('date')
    const sightings = await sightingsQuery.get()

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

export default getCountryUserSightings
