import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getAllObservations = async (request: Request, response: Response): Promise<Response<IObservation[]> | Error> => {
  try {
    const dbResponse = await db.collection('observations').orderBy('specie', 'asc').get()
    const list: IObservation[] = []
    for (const doc of dbResponse.docs) {
      const observationItem = doc.data()
      observationItem.id = doc.id

      list.push(observationItem as IObservation)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllObservations
