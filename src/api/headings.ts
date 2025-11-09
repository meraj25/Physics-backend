import express from 'express';
import { getAllHeadings } from '../application/headings';
import { createHeading } from '../application/headings';

const HeadingsRouter = express.Router();

HeadingsRouter
  .route('/')
  .get(getAllHeadings)
  .post(createHeading);

export default HeadingsRouter;