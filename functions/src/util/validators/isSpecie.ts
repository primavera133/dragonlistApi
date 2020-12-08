import adminConfig from '../../util/admin'

export const isSpecie = async (specie: string): Promise<boolean> => {
  try {
    return (await adminConfig.db.doc(`/species/${specie}`).get()).exists
  } catch (error) {
    console.error(error)
    return false
  }
}
