import { Response } from 'express'
import { db } from '../../index'
import { IAuthRequest, IObservation, IUser } from '../../types'

const deleteUserObservation = async (
  request: IAuthRequest,
  response: Response
): Promise<Response<{ ok: boolean }> | Error> => {
  try {
    const { observationId } = request.params

    const userDocRef = db.collection('users').doc(`${request.user?.email}`)
    const userDoc = await userDocRef.get()
    if (!userDoc.exists) {
      return response.status(400).json({ message: 'user not found' })
    }
    const userData = userDoc.data() as IUser
    const { observationsCount } = userData

    const obsDocument = await db.collection('observations').doc(observationId).get()
    if (!obsDocument.exists) {
      return response.status(400).json({ message: 'observation not found' })
    }
    const obsData = obsDocument.data() as IObservation

    const { country, email } = obsData

    if (email !== request.user?.email) {
      return response.status(400).json({ message: 'you can only delete your own observations' })
    }
    if (!observationsCount || !observationsCount[country]) {
      return response.status(400).json({ message: 'shit happens' })
    }

    userData.observationsCount = {
      ...observationsCount,
      [country]: {
        ...observationsCount[country],
        total: observationsCount[country].total - 1,
      },
    }

    await userDocRef.update(userData)
    await db.collection('observations').doc(observationId).delete()

    return response.json({ ok: true })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default deleteUserObservation
