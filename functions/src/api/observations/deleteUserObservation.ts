import { Response } from 'express'
import { db } from '../../index'
import { IAuthRequest, IObservation } from '../../types'

const deleteUserObservation = async (
  request: IAuthRequest,
  response: Response
): Promise<Response<{ ok: boolean }> | Error> => {
  try {
    const { observationId } = request.params
    const email = request.user?.email
    if (!email) {
      return response.status(400).json({ message: 'user email not found' })
    }

    const obsDocument = await db.collection('observations').doc(observationId).get()
    if (!obsDocument.exists) {
      return response.status(400).json({ message: 'observation not found' })
    }

    const observation = obsDocument.data() as IObservation
    if (observation.email !== email) {
      return response.status(400).json({ message: 'observation not found on user email' })
    }

    await db.collection('observations').doc(observationId).delete()

    return response.json({ ok: true })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default deleteUserObservation
