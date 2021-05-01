import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getUserTotals = async (request: Request, response: Response): Promise<Response<IObservation[]> | Error> => {
  try {
    const { email } = request.params
    const snapshot = await db.collection('userObservations').doc(email).get()
    if (!snapshot.exists) {
      return response.json({})
    }
    return response.json(snapshot.data())
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getUserTotals
