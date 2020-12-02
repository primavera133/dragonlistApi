import * as firebase from 'firebase-admin'
import { Request, Response } from 'express'
import { db } from '../util/admin'
import { ICountry } from '../types'

export const countryConverter = {
  toFirestore(country: ICountry): firebase.firestore.DocumentData {
    return {
      id: country.countryId,
      name: country.name,
      defaultLanguage: country.defaultLanguage,
      languages: country.languages,
      locale: country.locale,
      regiosn: country.regions,
      createdAt: country.createdAt,
    }
  },

  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): ICountry {
    const { id, defaultLanguage, languages, locale, name, regions, createdAt } = snapshot.data()
    return {
      countryId: id,
      name,
      defaultLanguage,
      languages,
      locale,
      regions,
      createdAt: createdAt,
    }
  },
}

const getAllCountries = async (request: Request, response: Response): Promise<Response<ICountry[]> | Error> => {
  try {
    const dbResponse = await db.collection('country').orderBy('name', 'asc').withConverter(countryConverter).get()

    const result = dbResponse.docs.map((doc) => {
      const data = doc.data()
      return data
    })
    return response.json(result)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllCountries
