import express from 'express';
import { GetResults } from '../application/peresult';
import { AddResult } from '../application/peresult';

const PEResultRouter = express.Router();

PEResultRouter
  .route('/')
  .get(GetResults)
  .post(AddResult);

export default PEResultRouter;