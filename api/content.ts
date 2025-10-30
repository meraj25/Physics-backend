import  express  from "express";
const ContentRouter = express.Router();

ContentRouter.get('/content', (req, res) => {
  res.json({ message: 'Hello from the content API!' });
});

export default ContentRouter;
