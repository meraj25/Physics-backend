import  express  from "express";
import { getAllContent,
          createContent,
          deleteContent,
          uploadthumbnail

 } from "../application/content";



const ContentRouter = express.Router();

ContentRouter
  .route("/")
  .get(getAllContent)
  .post(createContent)
 
ContentRouter
  .route("/:id")
  .delete(deleteContent)

ContentRouter
  .route("/thumbnail")
  .post(uploadthumbnail)



export default ContentRouter;
