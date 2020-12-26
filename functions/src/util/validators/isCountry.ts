import { db } from '../../index'

export const isCountry = async (country: string): Promise<boolean> => {
  try {
    const snapshot = await db.doc(`/countries/${country}`).get()
    const exists = snapshot.exists
    return exists
  } catch (error) {
    console.error(error)
    return false
  }
}
