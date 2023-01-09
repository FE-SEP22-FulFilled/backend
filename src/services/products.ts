/* eslint-disable no-console */
import fs from 'fs/promises';
import { Product } from '../types/Product';

export const getAll = async (): Promise<Product[] | null> => {
  return fs
    .readFile('./src/api/phones.json', 'utf-8')
    .then((data) => JSON.parse(data));
};

// eslint-disable-next-line consistent-return
export const getOne = async (params: string) => {
  try {
    const phones = await getAll();
    const findedPhone = phones?.find(phone => phone.id === params);

    if (findedPhone) {
      return await fs
        .readFile(`./src/api/phones/${findedPhone.phoneId}.json`, 'utf-8')
        .then((data) => JSON.parse(data));
    }
  } catch (err) {
    console.log(err);
  }
};
