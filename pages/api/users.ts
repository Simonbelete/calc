import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser, updateUser } from "controllers/userController";

type Data = {
  data: any;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const result = await createUser(req.body);
    if (result === null) res.status(500).send({ data: {}, status: 500 });
    else res.status(201).send({ data: result, status: 201 });
  } else if (req.method === "GET") {
    const result = await getUser(req.headers.authorization?.split("Bearer")[1]);
    res.status(200).send({ data: result, status: 200 });
  } else if (req.method === "PUT") {
    const result = await updateUser(
      req.headers.authorization?.split("Bearer")[1],
      req.body
    );
    if (result === null) res.status(500).send({ data: result, status: 500 });
    res.status(200).send({ data: result, status: 200 });
  }
}
