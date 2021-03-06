import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getCountryObservations = async (
  request: Request,
  response: Response
): Promise<Response<IObservation[]> | Error> => {
  try {
    const observations = await db
      .collection(`observations`)
      .where('country', '==', request.params.countryId)
      .orderBy('date')
      .get()

    const observationsItemList: IObservation[] = observations.docs.map((o) => o.data() as IObservation)

    return response.json(observationsItemList)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}

export default getCountryObservations
