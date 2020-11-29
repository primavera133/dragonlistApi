import { Request, Response } from 'express'

type DragonList = {
  id: string
  title: string
  body: string
}

const getDragonList = (request: Request, response: Response): Response<DragonList> => {
  const dragonList = [
    {
      id: '1',
      title: 'greeting',
      body: 'Hello world from sharvin shah',
    },
    {
      id: '2',
      title: 'greeting2',
      body: 'Hello2 world2 from sharvin shah',
    },
  ]
  return response.json(dragonList)
}

export default getDragonList
