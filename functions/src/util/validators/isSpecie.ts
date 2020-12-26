import { db } from '../../index'

export const isSpecie = async (specie: string): Promise<boolean> => {
  try {
    return (await db.doc(`/species/${specie}`).get()).exists
  } catch (error) {
    console.error(error)
    return false
  }
}
