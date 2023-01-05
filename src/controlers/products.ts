/* eslint-disable */

// import { Request, Response } from 'express';
import * as productServices from '../services/products';

export const getAll = async (req, res) => {
  try {
    const phones = await productServices.getAll();

    res.send(phones);
  } catch (error) {
    console.log(error);

    res.sendStatus(404);
  }
};
