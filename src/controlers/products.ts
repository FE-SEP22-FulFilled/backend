import { Request, Response } from 'express';
import * as productServices from '../services/products';

export const getAll = async (_req: Request, res: Response) => {
  const phones = await productServices.getAll();

  res.send(phones);
};
