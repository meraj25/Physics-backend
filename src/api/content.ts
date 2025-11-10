import  express  from "express";
import { getAllContent,
          createContent,
          deleteContent,

 } from "../application/content";



const ContentRouter = express.Router();

ContentRouter
  .route("/")
  .get(getAllContent)
  .post(createContent)
 
ContentRouter
  .route("/:id")
  .delete(deleteContent)



export default ContentRouter;
