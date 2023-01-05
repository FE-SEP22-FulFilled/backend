import fs from 'fs';
// import { Product } from '../types/Product';

export const getAll = () => {
  const phones = fs.readFileSync('./src/api/phones.json', 'utf-8');

  return JSON.parse(phones);
};
