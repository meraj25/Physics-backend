import express from 'express';
import { getAllTopics } from '../application/topic';

const TopicRouter = express.Router();

TopicRouter
  .route('/')
  .get(getAllTopics);

export default TopicRouter;
