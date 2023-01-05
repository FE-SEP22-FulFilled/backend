import * as productServices from '../services/products';

export const getAll = async (req, res) => {
  const phones = await productServices.getAll();

  res.send(phones);
};
