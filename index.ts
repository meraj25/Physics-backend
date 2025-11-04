import 'dotenv/config';
import express from 'express';
import connectDB from './infrastructure/db/index';
import ContentRouter from './api/content';
import CategoryRouter from './api/category';
import TopicRouter from './api/topic';
import YearRouter from './api/year';
import globalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware';
import StudyPackRouter from './api/studypack';
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

