import { Request, Response } from 'express';
import * as productServices from '../services/products';

export const getAll = async (req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log(req);

  try {
    const phones = await productServices.getAll();

    res.send(phones);
  } catch {
    res.sendStatus(404);
  }
};
