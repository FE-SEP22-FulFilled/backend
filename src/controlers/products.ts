/* eslint-disable no-console */
import { Request, Response } from 'express';
import * as productServices from '../services/products';

export const getAll = async (req: Request, res: Response) => {
  try {
    const phones = await productServices.getAll();
    const { quantity } = req.query;
    let int = Number(quantity);

    if (!int) {
      int = 16;
    }

    const displayedPhones = phones?.filter(phone => {
      switch (int) {
        case 16:
          return phone.id <= 16;

        case 8:
          return phone.id <= 8;

        case 4:
          return phone.id <= 4;

        default:
          return phone.id <= 16;
      }
    });

    res.send(displayedPhones);
  } catch (error) {
    console.log(error);

    res.sendStatus(404);
  }
};
