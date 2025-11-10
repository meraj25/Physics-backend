import 'dotenv/config';
import express from 'express';
import connectDB from './infrastructure/db';
import ContentRouter from './api/content';
import CategoryRouter from './api/category';
import TopicRouter from './api/headings';
import YearRouter from './api/year';
import globalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware';
import StudyPackRouter from './api/studypack';
import HeadingsRouter from './api/headings';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(express.json());

app.use(clerkMiddleware());

app.use(cors({ origin: "http://localhost:5173" }));

app.use('/api/contents', ContentRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/topics', TopicRouter);
app.use('/api/years', YearRouter);
app.use('/api/studyPacks', StudyPackRouter);
app.use('/api/headings', HeadingsRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

