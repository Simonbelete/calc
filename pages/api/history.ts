import type { NextApiRequest, NextApiResponse } from 'next'
import { createHistory, getHistories } from 'controllers/historyController';

type Data = {
  data: any;
  status: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST') {
    const result = await createHistory(req.headers.authorization?.split('Bearer')[1], req.body)
    if(result === null) res.status(500).send({data: {},status: 500})
    else res.status(201).send({data: result, status: 201})
  } else if(req.method === 'GET') {
    const result = await getHistories(req.headers.authorization?.split('Bearer')[1]);
    res.status(200).send({ data: result, status: 200})
  }
}
