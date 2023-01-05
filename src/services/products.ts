import fs from 'fs';
import { Product } from '../types/Product';

export const getAll = async (): Promise<Product[] | null> => {
  const phones = fs.readFileSync('./src/api/phones.json', 'utf-8');

  return JSON.parse(phones);
};
