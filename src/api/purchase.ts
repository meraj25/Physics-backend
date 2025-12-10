import express from 'express';
import { getAllPurchases } from '../application/purchase';
import { createPurchase } from '../application/purchase';

const PurchaseRouter = express.Router();

PurchaseRouter
  .route('/')
  .get(getAllPurchases)
  .post(createPurchase);

export default PurchaseRouter;