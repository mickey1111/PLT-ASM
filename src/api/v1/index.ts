import express from 'express';
import productRouter from "./product/product.router";

const v1Router = express.Router({ mergeParams: true });

v1Router.use('/v1', productRouter);

export default v1Router;