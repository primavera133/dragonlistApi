import adminConfig from '../../util/admin'
import { ICountry } from '../../types'

export const getCountryRef = async (country: string): Promise<FirebaseFirestore.DocumentReference<ICountry> | void> => {
  try {
    return (await adminConfig.db.doc(`/countries/${country}`).get())
      .ref as FirebaseFirestore.DocumentReference<ICountry>
  } catch (error) {
    console.error(error)
  }
}
