import { Request, Response } from 'express'
import { db } from '../../index'
import { ISighting } from '../../types'

const getAllSightings = async (request: Request, response: Response): Promise<Response<ISighting[]> | Error> => {
  try {
    const dbResponse = await db.collection('sightings').orderBy('specie', 'asc').get()
    const list: ISighting[] = []
    for (const doc of dbResponse.docs) {
      const sightingItem = doc.data()
      sightingItem.id = doc.id

      if (sightingItem.countryRef) {
        const country = await sightingItem.countryRef.get()
        sightingItem.countryData = country.data()
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

      list.push(sightingItem as ISighting)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllSightings
