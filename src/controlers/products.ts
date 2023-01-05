// import { Request, Response } from 'express';
import { Product } from 'src/types/Product';
import * as productServices from '../services/products';

export const getAll = async (
  req: unknown, res: { send: (arg0: Product[] | null) => void; },
) => {
  const phones = await productServices.getAll();

  res.send(phones);
};
