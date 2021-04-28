import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export const logActivities = functions.firestore.document('/{collection}/{id}').onCreate((snap, context) => {
  const collection = context.params.collection
  const id = context.params.id
  // const user = snap.data()

  const activities = admin.firestore().collection('activities')

  if (collection === 'observations') {
    return activities.add({ text: 'a new observation was added', id, date: new Date() })
  }
  if (collection === 'users') {
    return activities.add({ text: 'a new user was added', id, date: new Date() })
  }

  return null
})
