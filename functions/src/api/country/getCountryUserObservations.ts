import { Request, Response } from 'express'
import { db } from '../../index'
import { IObservation } from '../../types'

const getCountryUserObservations = async (
  request: Request,
  response: Response
): Promise<Response<IObservation[]> | Error> => {
  try {
    let observationsQuery = (await db.collection(
      `observations`
    )) as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>

    observationsQuery = observationsQuery.where('country', '==', request.params.countryId)
    observationsQuery = observationsQuery.where('email', '==', request.params.email)
    observationsQuery = observationsQuery.orderBy('date')
    const observations = await observationsQuery.get()

    const observationsItemList: IObservation[] = observations.docs.map((o) => o.data() as IObservation)

    return response.json(observationsItemList)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}

export default getCountryUserObservations
