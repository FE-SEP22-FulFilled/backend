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

    if (phones) {
      const findedPhone = phones.find((phone) => phone.id === params);

      if (findedPhone) {
        return await fs
          .readFile(`./src/api/phones/${findedPhone.phoneId}.json`, 'utf-8')
          .then((data) => JSON.parse(data));
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line consistent-return
export const getRandomPhones = async () => {
  const phones = await getAll();

  const randomPhones: Product[] = [];

  if (phones) {
    for (let i = 0; i <= 7; i += 1) {
      const randomPhone = phones[Math.floor(Math.random() * phones.length) + 4];

      randomPhones.push(randomPhone);
    }

    return [...new Set(randomPhones)].filter(item => item);
  }
};

export const getDIscountPhones = async (phones: Product[]) => {
  const discountPersent = 15; // here we can modify discount

  return phones.map((phone) => {
    const discount = (phone.price / 100) * discountPersent;
    const discountPrice = Math.floor(phone.price - discount);

    return {
      ...phone,
      discountPrice,
    };
  });
};
