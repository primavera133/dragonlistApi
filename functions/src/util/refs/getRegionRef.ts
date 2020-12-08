import adminConfig from '../../util/admin'
import { IRegion } from '../../types'

export const getRegionRef = async (region: string): Promise<FirebaseFirestore.DocumentReference<IRegion> | void> => {
  try {
    return (await adminConfig.db.doc(`/regions/${region}`).get()).ref as FirebaseFirestore.DocumentReference<IRegion>
  } catch (error) {
    console.error(error)
  }
}
