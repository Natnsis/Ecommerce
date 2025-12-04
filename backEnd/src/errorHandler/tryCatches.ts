import { Response } from 'express'

export const catchedError = (res: Response, Err: Error) => {
  console.log('error occured', Err);
  return res.json({ message: Err })
}
