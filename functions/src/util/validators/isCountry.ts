import adminConfig from '../../util/admin'

export const isCountry = async (country: string): Promise<boolean> => {
  try {
    const snapshot = await adminConfig.db.doc(`/countries/${country}`).get()
    const exists = snapshot.exists
    return exists
  } catch (error) {
    console.error(error)
    return false
  }
}
