import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getUserObservations = async (request: Request, response: Response): Promise<Response<IObservation[]> | Error> => {
  try {
    const email = request.params.userId
    const snapshot = await db.collection('observations').where('email', '==', email).orderBy('specie', 'asc').get()

    if (snapshot.empty) {
      return response.json([])
    }
    const list: IObservation[] = []

    for (const doc of snapshot.docs) {
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
export default getUserObservations
