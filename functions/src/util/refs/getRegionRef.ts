import { db } from '../../index'
import { IRegion } from '../../types'

export const getRegionRef = async (region: string): Promise<FirebaseFirestore.DocumentReference<IRegion> | void> => {
  try {
    return (await db.doc(`/regions/${region}`).get()).ref as FirebaseFirestore.DocumentReference<IRegion>
  } catch (error) {
    console.error(error)
  }
}
