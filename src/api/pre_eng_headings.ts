import express from 'express';
import { getAllHeadings,createHeading } from '../application/pre_eng_headings';


const Pre_Eng_HeadingsRouter = express.Router();

Pre_Eng_HeadingsRouter
  .route('/')
  .get(getAllHeadings)
  .post(createHeading);

export default Pre_Eng_HeadingsRouter;