import { Request, Response } from 'express'
import { db } from '../../index'
import { IMember } from '../../types'

const getAllMembers = async (request: Request, response: Response): Promise<Response<IMember[]> | Error> => {
  try {
    const dbResponse = await db.collection('users').where('unfinishedProfile', '==', false).get()
    const list: IMember[] = []
    for (const doc of dbResponse.docs) {
      list.push(doc.data() as IMember)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getAllMembers
