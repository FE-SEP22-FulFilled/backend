import express from 'express';
import * as productController from '../controlers/products';

export const router = express.Router();

router.get('/', productController.getPhonesByQuery);
