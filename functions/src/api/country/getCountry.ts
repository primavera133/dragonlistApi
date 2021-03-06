import { Request, Response } from 'express'
import { db } from '../../index'
import { ICountry } from '../../types'

const getCountry = async (request: Request, response: Response): Promise<Response<ICountry> | Error> => {
  try {
    const dbResponse = await db.doc(`/countries/${request.params.countryId}`).get()
    const countryItem: ICountry = dbResponse.data() as ICountry

    return response.json(countryItem)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getCountry
