import 'dotenv/config';
import express from 'express';
import connectDB from './infrastructure/db/index.js';
import ContentRouter from './api/content.js';
import CategoryRouter from './api/category.js';
import TopicRouter from './api/topic.js';
import YearRouter from './api/year.js';
import globalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware.js';

const app = express();

app.use(express.json());


app.use('/api', ContentRouter);
app.use('/categories', CategoryRouter);
app.use('/topics', TopicRouter);
app.use('/years', YearRouter);

app.use(globalErrorHandlingMiddleware);

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

