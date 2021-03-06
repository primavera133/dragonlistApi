import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getObservation = async (request: Request, response: Response): Promise<Response<IObservation[]> | Error> => {
  try {
    const dbResponse = await db.doc(`/observations/${request.params.observationId}`).get()
    const observationItem: IObservation = dbResponse.data() as IObservation

    return response.json(observationItem)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getObservation
