import { Request, Response } from 'express'
import { db } from '../../index'
import { ICountry } from '../../types'

const getAllCountries = async (request: Request, response: Response): Promise<Response<ICountry[]> | Error> => {
  try {
    const dbResponse = await db.collection('countries').orderBy('name', 'asc').get()
    const list: ICountry[] = []
    for (const doc of dbResponse.docs) {
      const countryItem = doc.data()
      countryItem.id = doc.id

      // Extract regions references
      if (countryItem.regionsRefs) {
        countryItem.regions = []
        for (const ref of countryItem.regionsRefs) {
          const region = await ref.get()
          countryItem.regions.push(region.data())
        }
        delete countryItem.regionsRefs
      }
      list.push(countryItem as ICountry)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllCountries
