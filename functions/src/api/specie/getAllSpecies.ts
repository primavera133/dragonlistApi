import { Request, Response } from 'express'
import { db } from '../../index'
import { ISpecie } from '../../types'

const getAllCountries = async (request: Request, response: Response): Promise<Response<ISpecie[]> | Error> => {
  try {
    const dbResponse = await db.collection('species').orderBy('scientific_name', 'asc').get()
    const list: ISpecie[] = []
    for (const doc of dbResponse.docs) {
      const specieItem = doc.data()
      specieItem.id = doc.id

      list.push(specieItem as ISpecie)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllCountries
