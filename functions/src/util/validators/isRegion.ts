import { db } from '../../index'
import { ICountry, TRegionName } from '../../types'

export const isRegion = async (country: string, regionName: TRegionName): Promise<boolean> => {
  try {
    const c = await db.doc(`/countries/${country}`).get()
    if (!c.exists) throw new Error('no such country')
    const { regions } = c.data() as ICountry
    return regions.includes(regionName)
  } catch (error) {
    console.error(error)
    return false
  }
}
