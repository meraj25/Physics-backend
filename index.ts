import 'dotenv/config';
import express from 'express';
import connectDB from './src/infrastructure/db';
import ContentRouter from './src/api/content';
import CategoryRouter from './src/api/category';
import TopicRouter from './src/api/topic';
import YearRouter from './src/api/year';
import globalErrorHandlingMiddleware from './src/api/middleware/global-error-handling-middleware';
import StudyPackRouter from './src/api/studypack';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

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

