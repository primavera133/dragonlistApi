import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { IObservation } from '../types'

interface IUserObservation {
  total: number
  [key: string]: any
}

export const incrementTotals = functions.firestore.document('/observations/{id}').onCreate(async (snap) => {
  const observationData = snap.data() as IObservation
  const { country, region, email } = observationData

  const userObservationRef = await admin.firestore().collection('userObservations').doc(email).get()
  if (userObservationRef.exists) {
    const update = {
      total: admin.firestore.FieldValue.increment(1),
      [country]: admin.firestore.FieldValue.increment(1),
    }
    if (region) {
      update[`${observationData.country}_${observationData.region}`] = admin.firestore.FieldValue.increment(1)
    }

    await admin.firestore().collection('userObservations').doc(email).update(update)
  } else {
    const userObservation: IUserObservation = {
      total: 1,
      [observationData.country]: 1,
    }
    if (observationData.region) {
      userObservation[`${observationData.country}_${observationData.region}`] = 1
    }
    await admin.firestore().collection('userObservations').doc(email).set(userObservation)
  }

  return null
})

export const decrementTotals = functions.firestore.document('/observations/{id}').onDelete(async (snap) => {
  const observationData = snap.data() as IObservation
  const { country, region, email } = observationData

  const userObservationRef = await admin.firestore().collection('userObservations').doc(email).get()
  if (userObservationRef.exists) {
    const update = {
      total: admin.firestore.FieldValue.increment(-1),
      [country]: admin.firestore.FieldValue.increment(-1),
    }
    if (region) {
      update[`${observationData.country}_${observationData.region}`] = admin.firestore.FieldValue.increment(-1)
    }

    await admin.firestore().collection('userObservations').doc(email).update(update)
  }

  return null
})
