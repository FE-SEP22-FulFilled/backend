/* eslint-disable no-console */
import { Request, Response } from 'express';
import { Product } from 'src/types/Product';
import { Query } from 'src/types/Query';
import { Results } from 'src/types/Results';
import * as productServices from '../services/products';

export const getPhonesByQuery = async (req: Request, res: Response) => {
  const phones = await productServices.getAll();

  if (!phones) {
    res.sendStatus(404);

    return;
  }

  let { page, limit } = req.query as Query;

  if (!page && !limit && phones) {
    limit = phones.length;
  }

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 8;
  }

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

export const getOne = async (req: Request, res: Response) => {
  const { phoneId } = req.params;

  const foundedPhone = await productServices.getOne(phoneId);

  if (!foundedPhone) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedPhone);
};

export const getRandomPhones = async (req: Request, res: Response) => {
  const phones = await productServices.getAll();

  if (!phones) {
    res.sendStatus(404);

    return;
  }

  const randomPhones: Product[] = [];

  for (let i = 0; i <= 7; i += 1) {
    const randomPhone = phones[Math.floor(Math.random() * phones.length) + 4];

    randomPhones.push(randomPhone);
  }

  const result = [...new Set(randomPhones)];

  res.send(result);
};
