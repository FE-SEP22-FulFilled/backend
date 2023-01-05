import { Product } from './Product';

export type Results = {
  results?: Product[];
  next?: object;
  previous?: object;
};
