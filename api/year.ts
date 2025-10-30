import express from 'express';
import { getAllYears } from '../application/year';

const YearRouter = express.Router();

YearRouter
.route('/')
.get(getAllYears);

export default YearRouter;
