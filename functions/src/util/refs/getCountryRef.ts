import { db } from '../../index'
import { ICountry } from '../../types'

export const getCountryRef = async (country: string): Promise<FirebaseFirestore.DocumentReference<ICountry> | void> => {
  try {
    return (await db.doc(`/countries/${country}`).get()).ref as FirebaseFirestore.DocumentReference<ICountry>
  } catch (error) {
    console.error(error)
  }
}
