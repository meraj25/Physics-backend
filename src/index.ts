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
import Maths_HeadingsRouter from './api/maths_headings';
import Pre_Eng_HeadingsRouter from './api/pre_eng_headings';
import PEContentRouter from './api/pecontent';
import PapersRouter from './api/papers';
import MathsContentRouter from './api/mathscontent';
import McontentRouter from './api/mcontent';
import ResultRouter from './api/result';
import MathsResultRouter from './api/mathsresult';
import SPResultRouter from './api/spresult';
import MSPResultRouter from './api/mspresult';
import PEResultRouter from './api/peresult';
import PaymentRouter from './api/payment';
import PurchasesRouter from './api/purchase';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';


console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET');
console.log('CLERK_PUBLISHABLE_KEY:', process.env.CLERK_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ 
  origin: "https://sanjayasuriya.online",
}));

app.use(clerkMiddleware());

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

app.use('/api/contents', ContentRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/topics', TopicRouter);
app.use('/api/years', YearRouter);
app.use('/api/studyPacks', StudyPackRouter);
app.use('/api/headings', HeadingsRouter);
app.use('/api/payments', PaymentRouter);
app.use('/api/pre_eng_headings',Pre_Eng_HeadingsRouter);
app.use('/api/maths_headings',Maths_HeadingsRouter);
app.use('/api/pecontents',PEContentRouter);
app.use('/api/papers',PapersRouter);
app.use('/api/mathscontents',MathsContentRouter);
app.use('/api/mcontents',McontentRouter);
app.use('/api/results',ResultRouter);
app.use('/api/mathsresults',MathsResultRouter);
app.use('/api/spresults',SPResultRouter);
app.use('/api/mspresults',MSPResultRouter);
app.use('/api/peresults',PEResultRouter);
app.use('/api/purchases',PurchasesRouter);


app.use(globalErrorHandlingMiddleware);

connectDB();


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

