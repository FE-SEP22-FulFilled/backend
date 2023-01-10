/* eslint-disable no-console */
import { Request, Response } from 'express';
// import { SortBy } from 'src/types/SortBy';
import { Query } from 'src/types/Query';
import { Results } from 'src/types/Results';

import * as SortBy from '../types/SortBy';

import * as productServices from '../services/products';

export const getPhonesByQuery = async (req: Request, res: Response) => {
  const phones = await productServices.getAll();

  if (!phones) {
    res.sendStatus(404);

    return;
  }

  let { page, limit, sortBy } = req.query as Query;

  if (!page && !limit && phones) {
    limit = phones.length;
  }

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 8;
  }

  if (!sortBy) {
    sortBy = SortBy.SortBy.Nevest;
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

    results.results.sort((phone1, phone2) => {
      switch (sortBy) {
        case SortBy.SortBy.Nevest:
          return phone2.year - phone1.year;

        case SortBy.SortBy.Oldest:
          return phone1.year - phone2.year;

        case SortBy.SortBy.LowPriced:
          return phone1.price - phone2.price;

        case SortBy.SortBy.HighPriced:
          return phone2.price - phone1.price;

        case SortBy.SortBy.Popular:
          return phone2.fullPrice - phone1.fullPrice;

        default:
          return +phone2.id - +phone1.id;
      }
    });
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
  const randomPhones = await productServices.getRandomPhones();

  if (!randomPhones) {
    res.sendStatus(404);

    return;
  }

  res.send(randomPhones);
};

export const getNewPhones = async (req: Request, res: Response) => {
  const phones = await productServices.getAll();

  if (!phones) {
    res.sendStatus(404);

    return;
  }

  const newestPhones = phones.filter((phone) => phone.year >= 2019);

  newestPhones.length = 6;

  res.send(newestPhones);
};

export const getDiscountPhones = async (req: Request, res: Response) => {
  const randomPhones = await productServices.getRandomPhones();

  if (!randomPhones) {
    res.sendStatus(404);

    return;
  }

  const result = await productServices.getDIscountPhones(randomPhones);

  res.send(result);
};
