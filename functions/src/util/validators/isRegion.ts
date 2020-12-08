import adminConfig from '../../util/admin'

export const isRegion = async (region: string): Promise<boolean> => {
  try {
    return (await adminConfig.db.doc(`/regions/${region}`).get()).exists
  } catch (error) {
    console.error(error)
    return false
  }
}
