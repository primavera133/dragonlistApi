import { Request, Response } from 'express'
import { db } from '../../index'
import { IUser } from '../../types'

const getTopObservers = async (request: Request, response: Response): Promise<Response<IUser[]> | Error> => {
  try {
    const { country } = request.params
    const snapshot = await db.collection('userObservations').orderBy(country, 'desc').limit(10).get()

    if (snapshot.empty) {
      return response.json([])
    }

    return response.json(snapshot.docs.map((doc) => doc.data()))
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getTopObservers
