import express from 'express';
import * as productController from '../controlers/products';

export const router = express.Router();

router.get('/', productController.getPhonesByQuery);
router.get('/new', productController.getNewPhones);
router.get('/discount', productController.getDiscountPhones);
router.get('/:phoneId', productController.getOne);
router.get('/:phoneId/recomended', productController.getRandomPhones);
