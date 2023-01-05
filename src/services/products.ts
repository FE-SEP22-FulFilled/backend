/* eslint-disable no-console */
import fs from 'fs/promises';
// import { Product } from '../types/Product';

export const getAll = async () => {
  return fs
    .readFile('./src/api/phones.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error, 'error'));
};
