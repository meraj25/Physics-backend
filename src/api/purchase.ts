import express from 'express';
import { getAllPurchases } from '../application/purchases';
import { createPurchase } from '../application/purchases';

const PurchasesRouter = express.Router();

PurchasesRouter
  .route('/')
  .get(getAllPurchases)
  .post(createPurchase);

export default PurchasesRouter;