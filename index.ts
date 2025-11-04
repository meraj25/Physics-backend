import 'dotenv/config';
import express from 'express';
import connectDB from './infrastructure/db/index.js';
import ContentRouter from './api/content.js';
import CategoryRouter from './api/category.js';
import TopicRouter from './api/topic.js';
import YearRouter from './api/year.js';
import globalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware.js';
import StudyPackRouter from './api/studypack.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}));

app.use('/api/contents', ContentRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/topics', TopicRouter);
app.use('/api/years', YearRouter);
app.use('/api/studyPacks', StudyPackRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

