import { Request, Response } from 'express'
import adminConfig from '../../util/admin'
import { ICountry, IRegion } from '../../types'

const getCountry = async (request: Request, response: Response): Promise<Response<ICountry> | Error> => {
  try {
    const dbResponse = await adminConfig.db.doc(`/country/${request.params.countryId}`).get()
    const countryItem: ICountry = dbResponse.data() as ICountry

    // Extract regions references
    if (countryItem.regionsRefs) {
      countryItem.regions = []
      for (const ref of countryItem.regionsRefs) {
        const region: IRegion = (await ref.get()).data() as IRegion
        countryItem.regions.push(region)
      }
      delete countryItem.regionsRefs
    }

    return response.json(countryItem)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getCountry
