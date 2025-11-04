import express from 'express';
import { getAllYears, createYear } from '../application/year';

const YearRouter = express.Router();

YearRouter
.route('/')
.get(getAllYears)
.post(createYear);

export default YearRouter;
