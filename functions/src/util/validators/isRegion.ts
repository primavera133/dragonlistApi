import { db } from '../../index'

export const isRegion = async (region: string): Promise<boolean> => {
  try {
    return (await db.doc(`/regions/${region}`).get()).exists
  } catch (error) {
    console.error(error)
    return false
  }
}
