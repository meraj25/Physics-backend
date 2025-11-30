import express from 'express';
import { getAllHeadings, createHeading } from '../application/maths_headings';


const Maths_HeadingsRouter = express.Router();

Maths_HeadingsRouter
  .route('/')
  .get(getAllHeadings)
  .post(createHeading);

export default Maths_HeadingsRouter;