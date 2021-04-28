import { Request, Response } from 'express'
import { db } from '../../index'
import { IHighscores } from '../../types'

const getHighscores = async (request: Request, response: Response): Promise<Response<IHighscores[]> | Error> => {
  try {
    const dbResponse = await db.collection('highscores').get()
    const list: IHighscores[] = []
    for (const doc of dbResponse.docs) {
      list.push(doc.data() as IHighscores)
    }

    return response.json(list)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: err.code })
  }
}
export default getHighscores
