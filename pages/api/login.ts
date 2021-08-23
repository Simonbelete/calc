import type { NextApiRequest, NextApiResponse } from 'next'
import { login } from 'controllers/loginController';

type Data = {
  data: any;
  status: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST') {
    const result = await login(req.body.nick, req.body.password);
    if(result === null) res.status(500).send({data: {},status: 500})
    else res.status(201).send({data: result, status: 201})
  } else if(req.method === 'GET') {

  }
}
