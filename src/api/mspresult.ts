import express from 'express';
import { GetResults } from '../application/mspresult';
import { AddResult } from '../application/mspresult';

const MSPResultRouter = express.Router();

MSPResultRouter
  .route('/')
  .get(GetResults)
  .post(AddResult);

export default MSPResultRouter;