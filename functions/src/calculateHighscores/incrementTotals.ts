import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { IObservation } from '../types'

type UserObservation = Record<string, number | string | admin.firestore.FieldValue>

export const incrementTotals = functions.firestore.document('/observations/{id}').onCreate(async (snap) => {
  const observationData = snap.data() as IObservation
  const { country, region, email, specie } = observationData

  const userObservationRef = await admin.firestore().collection('userObservations').doc(email).get()
  const userSnapshot = await admin.firestore().collection('users').doc(email).get()
  const user = userSnapshot.data()
  const name = `${user?.firstName} ${user?.lastName}`

  console.log(11111, name)

  if (!userObservationRef.exists) {
    const userObservation: UserObservation = {
      name,
      total: 1,
      [country]: 1,
    }
    if (region) {
      userObservation[`${country}___${region}`] = 1
    }
    await admin.firestore().collection('userObservations').doc(email).set(userObservation)
  } else {
    const allOfSameSpecie = await admin
      .firestore()
      .collection('observations')
      .where('email', '==', email)
      .where('specie', '==', specie)
      .get()
    const isUnique = allOfSameSpecie.size === 0

    const allOfSameSpecieCountry = await admin
      .firestore()
      .collection('observations')
      .where('email', '==', email)
      .where('specie', '==', specie)
      .where('country', '==', country)
      .get()
    const isUniqueCountry = allOfSameSpecieCountry.size === 0

    let isUniqueCountryRegion
    if (region) {
      const allOfSameSpecieCountryRegion = await admin
        .firestore()
        .collection('observations')
        .where('email', '==', email)
        .where('specie', '==', specie)
        .where('country', '==', country)
        .where('region', '==', region)
        .get()
      isUniqueCountryRegion = allOfSameSpecieCountryRegion.size === 0
    }

    if (!isUnique && !isUniqueCountry && !isUniqueCountryRegion) return null

    const update: UserObservation = { name } // catch updated names

    if (isUnique) {
      update.total = admin.firestore.FieldValue.increment(1)
    }
    if (isUniqueCountry) {
      update[`${country}`] = admin.firestore.FieldValue.increment(1)
    }
    if (isUniqueCountryRegion) {
      update[`${country}___${region}`] = admin.firestore.FieldValue.increment(1)
    }
    console.log('update', update)
    await admin.firestore().collection('userObservations').doc(email).update(update)
  }

  return null
})
