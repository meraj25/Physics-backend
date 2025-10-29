import express from 'express';
import ContentRouter from './api/content.js';
import connectDB from './infrastructure/db/index.js';

const app = express();

app.use(express.json());


app.use('/api', ContentRouter);

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

