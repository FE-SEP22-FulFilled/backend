/* eslint-disable no-console */
import { Request, Response } from 'express';
import { Query } from 'src/types/Query';
import { Results } from 'src/types/Results';
import * as productServices from '../services/products';

export const getPhonesByQuery = async (req: Request, res: Response) => {
  const phones = await productServices.getAll();
  let { page, limit } = req.query as Query;

  const startIndex = (+page - 1) * +limit;
  const endIndex = +page * +limit;
  const results: Results = {};

  if (phones && endIndex < phones.length) {
    results.next = {
      page: +page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: +page - 1,
      limit,
    };
  }

  if (phones) {
    results.results = phones.slice(startIndex, endIndex);
  }

  res.send(results);
};
