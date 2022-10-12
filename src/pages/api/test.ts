import { NextApiRequest, NextApiResponse } from "next"

export default function HelloAPI(req: NextApiRequest, res: NextApiResponse){
  return res.json({
    message: 'hello world'
  })
}