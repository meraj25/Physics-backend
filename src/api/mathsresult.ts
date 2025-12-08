import express from 'express';
import { GetResults } from '../application/mathsresult';
import { AddResult } from '../application/mathsresult';

const MathsResultRouter = express.Router();

MathsResultRouter
  .route('/')
  .get(GetResults)
  .post(AddResult);

export default MathsResultRouter;