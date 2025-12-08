import express from 'express';
import { GetResults } from '../application/spresult';
import { AddResult } from '../application/spresult';

const SPResultRouter = express.Router();

SPResultRouter
  .route('/')
  .get(GetResults)
  .post(AddResult);

export default SPResultRouter;