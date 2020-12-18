import adminConfig from '../../util/admin'
import { ISpecie } from '../../types'

export const getSpecieRef = async (specie: string): Promise<FirebaseFirestore.DocumentReference<ISpecie> | void> => {
  try {
    return (await adminConfig.db.doc(`/species/${specie}`).get()).ref as FirebaseFirestore.DocumentReference<ISpecie>
  } catch (error) {
    console.error(error)
  }
}