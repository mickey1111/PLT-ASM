import express from 'express';
import ProductCtrl from './product.controller';
import { validateRequestParams } from './product.validation';

const productRouter = express.Router({ mergeParams: true });

productRouter.get("/product/stock", validateRequestParams, ProductCtrl.getStockQTYBySKU);

export default productRouter;