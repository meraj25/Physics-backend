import express from 'express';
import { GetResults } from '../application/result';
import { AddResult } from '../application/result';

const ResultRouter = express.Router();

ResultRouter
  .route('/')
  .get(GetResults)
  .post(AddResult);

export default ResultRouter;