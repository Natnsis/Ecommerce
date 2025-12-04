import { Request, Response } from 'express';
import { catchedError } from '../errorHandler/tryCatches';
import { prisma } from '../../lib/prisma';

export const register = async (req: Request, res: Response) => {
  try {
    const { fName, lName, password, email, phone, address, imageUrl } = req.body;
    const db = await prisma.user.create({
      fName,
      lName,
      password,
      email,
      phone,
      address,
      imageUrl
    })
  } catch (e: any) {
    return catchedError(res, e)
  }
}
