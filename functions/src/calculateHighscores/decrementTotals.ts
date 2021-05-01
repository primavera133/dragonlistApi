import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { IObservation } from '../types'

type UserObservation = Record<string, number | string | admin.firestore.FieldValue>

export const decrementTotals = functions.firestore.document('/observations/{id}').onDelete(async (snap) => {
  const observationData = snap.data() as IObservation
  const { country, region, email, name, specie } = observationData

  const userObservationRef = await admin.firestore().collection('userObservations').doc(email).get()

  if (userObservationRef.exists) {
    const allOfSameSpecie = await admin
      .firestore()
      .collection('observations')
      .where('email', '==', email)
      .where('specie', '==', specie)
      .get()
    const isLast = allOfSameSpecie.size <= 1

    const allOfSameSpecieCountry = await admin
      .firestore()
      .collection('observations')
      .where('email', '==', email)
      .where('specie', '==', specie)
      .where('country', '==', country)
      .get()
    const isLastCountry = allOfSameSpecieCountry.size <= 1

    let isLastCountryRegion
    if (region) {
      const allOfSameSpecieCountryRegion = await admin
        .firestore()
        .collection('observations')
        .where('email', '==', email)
        .where('specie', '==', specie)
        .where('country', '==', country)
        .where('region', '==', region)
        .get()
      isLastCountryRegion = allOfSameSpecieCountryRegion.size <= 1
    }

    if (!isLast && !isLastCountry && !isLastCountryRegion) return null

    const update: UserObservation = { name } // catch updated names

    if (isLast) {
      update.total = admin.firestore.FieldValue.increment(-1)
    }
    if (isLastCountry) {
      update[country] = admin.firestore.FieldValue.increment(-1)
    }
    if (isLastCountryRegion) {
      update[`${observationData.country}___${observationData.region}`] = admin.firestore.FieldValue.increment(-1)
    }

    await admin.firestore().collection('userObservations').doc(email).update(update)
  }

  return null
})
